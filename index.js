'use strict';

let logger = require('./lib/log'),
	fileLog = logger('file'),
	terminalLog = logger('console');

// 是否需要记录到文件，配置文件地址
// request field method/url/status/duration
// hightlight 高亮哪个field
// {
// 	type: 'console'/'file'/'both', //default console
// 	path: '', // just active for file/both type
// 	hightlight: {
// 		field:'status'; 
// 		color: 'green color'
// 	}
// 	duration: {
// 		//color: lt< 30 green, gt>30 & lt<50 yellow, gt>50 red
// 		using: true/false; // default false
// 		warning: 30; // ms as units, 
// 		danger: 50; 
// 	}
// 	fields:['method', 'url', 'status', 'duration']; it's order decide the console order
// }

/**
 * a middleware for koa request log
 */
module.exports = () => {
	return function* (next){

	    let startRequstTime = new Date();
	  	this.res.on('finish', () => {
	    	let duration = ((new Date()) - startRequstTime);

	    	terminalLog.info(this.method, this.url, String(this.status).green, ('(' + duration + 'ms)').red);
	  	});

		// console.log('method>', this.method);
		// console.log('url>', this.url);
		// console.log('statusCode>', this.status, this.res.statusCode);
		// console.log('ip>', this.ip);
		// console.log('acceptsCharsets>', this.acceptsCharsets().join(';'));
		// console.log('acceptsEncodings>', this.acceptsEncodings().join(';'));
		// console.log('query>', this.query);
		// console.log('protocol>', this.protocol);
		// console.log('href>', this.href);
		// console.log('path>', this.path);
		// console.log('originalUrl>', this.originalUrl);
		// console.log('querystring>', this.querystring);
		// console.log('host>', this.host);
		// console.log('hostname>', this.hostname);
		// console.log('fresh>', this.fresh);
		// console.log('stale>', this.stale);
		// next middleware
		yield next;
	};
};