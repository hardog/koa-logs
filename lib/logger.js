'use strict';

let log4js = require('log4js'),
	env = process.env.NODE_ENV || "development"

log4js.configure({
  appenders: [
    { type: 'console', category: 'console' },
    { type: 'file', filename: 'logs/rquest.log', category: 'file' }
  ]
});

logger.setLevel(env !== 'test' ? 'DEBUG' : 'ERROR')

module.exports = log4js.getLogger;
