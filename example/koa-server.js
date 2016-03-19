'use strict';

let koa = require('koa'),
	requestLog = require('../'),
	routes = require('./routes'),
	app = new koa();

require('colors');

app
.use(routes)
.use(requestLog({
	// type: 'both',
	contrast: 'cyan',
	// highlight: {
	// 	field: 'method',
	// 	color: 'red'
	// },
	duration: {
		use: true,
		warning: 1, // ms units
		danger: 6
	},
	fields: ['method', 'url', 'status', 'duration']
}));

app.listen(3000);
console.log('Example Server is running at http://localhost:3000'.green);