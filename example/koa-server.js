'use strict';

let koa = require('koa'),
	requestLog = require('../'),
	routes = require('./routes'),
	app = new koa();

require('colors');
app
.use(routes)
.use(requestLog());

app.listen(3000);
console.log('Example Server is running at http://localhost:3000'.green);