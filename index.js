'use strict';

let logger = require('./lib/logger'),
	fileLog = logger('file'),
	terminalLog = logger('console');

/**
 * a middleware for koa request log
 */
module.exports = () => {
	return function* (next){


		// next middleware
		yield next;
	};
};