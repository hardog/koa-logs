'use strict';

let log4js = require('log4js');

module.exports = (options) => {
	let fileLog, 
		consoleLog, 
		type = options.type,
		path = options.path;

	log4js.configure({
	  appenders: [
	    { type: 'console', category: 'console' },
	    { type: 'file', filename: path, category: 'file' }
	  ]
	});

	// get logger handler
	fileLog = log4js.getLogger('file');
	consoleLog = log4js.getLogger('console');

	// set level
	fileLog.setLevel('INFO');
	consoleLog.setLevel('INFO');

	// mapping for log info
	let output = {
		console: (info) => {
			consoleLog.info(info);
		},
		file: (info) => {
			fileLog.info(info);
		},
		both: (info) => {
			fileLog.info(info);
			consoleLog.info(info);
		}
	};

	return output[type];
};
