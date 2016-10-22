'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const koa = require('koa');
const log = require('../');

describe('#index', function(){
    let app = koa();
    app.use(log('tiny'));

    it('should', function(){
        request(app.listen())
        .get('/')
        .end(function(){});
    });
});