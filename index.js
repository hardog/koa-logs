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
        let req = this.req;
        let res = this.res;

        req.start_at = undefined;
        res.start_at = undefined;

        if(skip !== false && skip(req, res)){
            debug('skip request');
        }else{
            // log start time when request come
            record_start_time.call(this.req);

            // after res.end call, log end time
            on_headers(res, record_start_time)
            // log when response finished
            on_finished(res, finish_log.call(this, fmt, handle, line));
        }

        yield next;
    };
};

function log_handle(opts) {
    let handle_fn = empty;
    let handle_stream = {write: empty};

    if(!opts.handle){
        /* eslint-disable no-console */
        opts.handle = console.log;
    }

    if(typeof opts.handle === 'function'){
        handle_fn = opts.handle;
    }else{
        handle_stream = opts.handle;
    }

    return function(msg){
        debug('handling log msg');
        handle_fn(msg + '\n');
        handle_stream.write(msg + '\n');
    };
}

function empty(){}

function record_start_time(){
    debug('record start_at time');
    this.start_at = process.hrtime();
}

function finish_log(fmt, handle, line){
    let self = this;
    return function(){
        handle(line(fmt, self));
    };
}