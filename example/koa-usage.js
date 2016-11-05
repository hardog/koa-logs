'use strict';

const koa = require('koa');
const log = require('../');
const fs = require('fs');

let app = koa();
let opts = {
    interval: 1000,
	handle: process.stdout, //fs.createWriteStream('simpe.txt'), console.log(default)
	skip: function(ctx){
		// ctx is koa context
		// return true or false
	}
};

app.use(log());
// app.use(function* (){
//     console.log(process.memoryUsage())
// })
app.listen(3000);
