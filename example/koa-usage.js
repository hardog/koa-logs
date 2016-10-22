'use strict';

const koa = require('koa');
const log = require('../');

let app = koa();
let opts = {
	handle: console.log, // process.stdout, fs.createWriteStream
	skip: function(ctx){
		// ctx is koa context
		// return true or false
	}
};

app.use(log('tiny', opts));

app.listen(3000);
