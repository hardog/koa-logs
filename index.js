'use strict';

const debug = require('debug')('koa-logs');
const on_headers = require('on-headers');
const on_finished = require('on-finished');
const line = require('./line');

// support 
// opts.handle
// opts.skip
module.exports = function(format, opts){
    debug('use koa request log');
    opts = opts || {};

    let fmt = format || 'tiny';
    let handle = log_handle(opts);
    let skip = opts.skip || false;

    return function *koa_request_log(next){
        debug('running koa request log middleware');
        let self = this;
        let req = self.req;
        let res = self.res;

        req.start_at = undefined;
        req.start_time = undefined;
        res.start_at = undefined;
        res.start_time = undefined;

        if(skip !== false && skip(self)){
            /* istanbul ignore next */
            debug('skip request');
        }else{
            // log start time when request come
            record_start_time.call(self.req);

            // after res.end call, log end time
            on_headers(res, record_start_time);
            // log when response finished
            on_finished(res, function(){
                handle(line(fmt, self));
            });
        }

        yield next;
    };
};

function log_handle(opts) {
    let exe_fn = opts.handle;

    if(!exe_fn){
        /* eslint-disable no-console */
        opts.handle = console.log;
        exe_fn = opts.handle;
    }

    if(typeof exe_fn === 'function'){
        exe_fn = {
            write: opts.handle
        };
    }

    return function(msg){
        debug('handling log msg');

        msg = further_deal_msg(msg, opts);
        exe_fn.write(msg);
    };
}

function further_deal_msg(msg, opts){
    // 处理process.stdout 不换行
    if(opts.handle !== console.log){
        msg = msg + '\n';
    }

    // 处理stream终端不打印消息问题
    if(opts.handle && opts.handle.write){
        console.log(msg);
    }

    return msg;
}

function record_start_time(){
    debug('record start_at time');
    this.start_at = process.hrtime();
    this.start_time = new Date();
}