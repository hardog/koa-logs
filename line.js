'use strict';

const debug = require('debug')('koa-logs');

let type_map = {
    tiny: ':date :method :url :status :reponse-time :size'
};

module.exports = line;

function line(format, ctx){
    debug(format, ' generating log msg');

    let values = [];
    let fields = type_map[format];

    fields.replace(/:([-\w]+)/g, function(_, field){
        values.push(line[field](ctx));
    });

    return values.join(' ');
}

line['date'] = function date(ctx){
    return ctx.req.start_time;  
};

line['method'] = function method(ctx){
    return ctx.req.method;
};

line['url'] = function url(ctx){
    return ctx.req.url;
};

line['status'] = function status(ctx){
    return ctx.res.statusCode;
};

line['size'] = function size(ctx){
    return ctx.response.length;
};

line['reponse-time'] = function response_time(ctx){
    if (!ctx.req.start_at || !ctx.res.start_at) {
        // missing request and/or response start time
        return;
    }

    // 1纳秒等于1e-6秒
    let ms = (ctx.res.start_at[0] - ctx.req.start_at[0]) * 1e3 +
        (ctx.res.start_at[1] - ctx.req.start_at[1]) * 1e-6

    // return truncated value
    return ms.toFixed(3) + 'ms';
};