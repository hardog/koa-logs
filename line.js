'use strict';

let type_map = {
    tiny: ['date', 'method', 'url', 'status', 'reponse-time', 'size']
};

module.exports = line;

function line(format, req, res){
    let fields = type_map[format];
    let values = [];

    fields.forEach(function(v){
        values.push(this[v](req, res));
    });

    return values.join(' ');
}

line['date'] = function(req, res){
    return clfdate(new Date());  
};

function clfdate(dateTime){
  let date = dateTime.getUTCDate()
  let hour = dateTime.getUTCHours()
  let mins = dateTime.getUTCMinutes()
  let secs = dateTime.getUTCSeconds()
  let year = dateTime.getUTCFullYear()

  let month = dateTime.getUTCMonth() + 1;

  return pad2(date) + '/' + month + '/' + year +
    ':' + pad2(hour) + ':' + pad2(mins) + ':' + pad2(secs) +
    ' +0000'
}

function pad2(num){
  let str = String(num)
  // 补齐两位
  return (str.length === 1 ? '0' : '') + str
}

line['method'] = function(req, res){
    return req.method;
};

line['url'] = function(req, res){
    return req.url;
};

line['status'] = function(req, res){
    return res.statusCode;
};

line['size'] = function(req, res){
    return res.length;
};

line['reponse-time'] = function(req, res){
    if (!req.start_at || !res.start_at) {
        // missing request and/or response start time
        return
    }

    // calculate diff
    // 1纳秒等于1e-6秒
    let ms = (res.start_at[0] - req.start_at[0]) * 1e3 +
        (res.start_at[1] - req.start_at[1]) * 1e-6

    // return truncated value
    return ms.toFixed(3)
};