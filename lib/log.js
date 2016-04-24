'use strict';

let log4js = require('log4js');

module.exports = (options) => {
	let consoleLog;

	log4js.configure({
	  appenders: [
	    { type: 'console', category: 'console' },
	  ]
	});

	// get logger handler
	consoleLog = log4js.getLogger('console');
	// set level
	consoleLog.setLevel('INFO');

	return (info) => {
		consoleLog.info(info);
	};
};
