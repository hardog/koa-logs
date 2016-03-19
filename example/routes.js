'use strict';

let router = require('koa-router')();

module.exports = router.routes();

router.get('/user', function* (next){
	this.body = 'this is user get!';
	yield next;
});

router.get('/', function* (next){
	this.body = 'this is index page!';
	yield next;
});