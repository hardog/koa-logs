'use strict';

const debug = require('debug')('koa-logs');

let type_map = {
    tiny: ['date', 'method', 'url', 'status', 'reponse-time', 'size']
};

module.exports = line;

function line(format, ctx){
    debug(format, ' generating log msg');

    let fields = type_map[format];
    let values = [];

    fields.forEach(function(v){
        values.push(line[v](ctx));
    });

    return values.join(' ');
}

line['date'] = function(ctx){
    return (new Date()).toLocaleString();  
};

function pad2(num){
  let str = String(num)
  // 补齐两位
  return (str.length === 1 ? '0' : '') + str
}

line['method'] = function(ctx){
    return ctx.req.method;
};

line['url'] = function(ctx){
    return ctx.req.url;
};

line['status'] = function(ctx){
    return ctx.res.statusCode;
};

line['size'] = function(ctx){
    return ctx.response.length;
};

line['reponse-time'] = function(ctx){
    if (!ctx.req.start_at || !ctx.res.start_at) {
        // missing request and/or response start time
        return
    }

    // calculate diff
    // 1纳秒等于1e-6秒
    let ms = (ctx.res.start_at[0] - ctx.req.start_at[0]) * 1e3 +
        (ctx.res.start_at[1] - ctx.req.start_at[1]) * 1e-6

    // return truncated value
    return ms.toFixed(3) + 'ms';
};