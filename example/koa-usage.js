'use strict';

const koa = require('koa');
const log = require('../');
const fs = require('fs');

let app = koa();
let opts = {
	handle: fs.createWriteStream('simpe.txt'), // console.log(default), process.stdout
	skip: function(ctx){
		// ctx is koa context
		// return true or false
	}
};

app.use(log('tiny', opts));

app.listen(3000);
