'use strict';

let options = require('./lib/opts'),
	logger = require('./lib/log'),
	parse = require('./lib/parse');

/**
 * a middleware for koa request log
 */
module.exports = (param) => {
	let opts = options(param),
		log = logger(opts);

	return function* (next){
		let ctx = this,
			requestInfo = [],
			startRequstTime = new Date();

	  	ctx.res.on('finish', () => {
	    	let duration = ((new Date()) - startRequstTime);

	  		// to info object
			let key, val, len = opts.fields.length;
			for(let i = 0; i < len; i++){
				key = opts.fields[i];
				val = ctx[key];

				if(key === 'duration'){ val = duration; }
				val = (typeof val === 'object' ? JSON.stringify(val) : val);
				requestInfo.push(`${key}:${val}`);
			}

	    	// show info
	    	log(parse(opts, requestInfo));
	  	});

		yield next;
	};
};