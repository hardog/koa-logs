'use strict';

const expect = require('chai').expect;
const request = require('supertest');
const fs = require('fs');
const koa = require('koa');
const log = require('../');

process.on('uncaughtException', (err) => {
    console.log(err);
});

describe('#index', function(){
    let app = koa();
    let str;
    let opts = {
        handle: function(msg){
            str = msg;
        }
    };

     it('should work when use app(log())', function(done){
        app.use(log());
        request(app.listen())
        .get('/path')
        .end(done);
    });

    it('should /GET \\/path 404/.test(str) ok', function(done){
        app.use(log('tiny', opts));
        request(app.listen())
        .get('/path')
        .end(function(){
            expect((/GET \/path 404/g).test(str)).to.be.true;
            done();
        });
    });

    it('should /POST \\/path 404/.test(str) ok', function(done){
        app.use(log('tiny', opts));
        request(app.listen())
        .post('/path')
        .end(function(){
            expect((/POST \/path 404/g).test(str)).to.be.true;
            done();
        });
    });

    it('should /POST \\/path\\/1 200/.test(str) ok', function(done){
        app.use(log('tiny', opts));
        app.use(function *(){
            if(this.url === '/path/1'){
                this.body = 'hello';
            }
        });

        request(app.listen())
        .post('/path/1')
        .end(function(){
            expect((/POST \/path\/1 200/g).test(str)).to.be.true;
            done();
        });
    });

    it('should assert str undefined when use skip', function(done){
        let str;
        let optts = {
            handle: function(msg){
                str = msg;
            },
            skip: function(ctx){
                if(ctx.url === '/ignore'){
                    return true;
                }

                return false;
            }
        };

        app.use(log('tiny', optts));
        app.use(function *(){
            if(this.url === '/ignore'){
                this.body = 'ignore';
            }
        });

        request(app.listen())
        .post('/ignore')
        .end(function(){
            expect(str).to.be.undefined;
            done();
        });
    });

    it('should use default console.log handle', function(){
        app.use(log('tiny'));

        request(app.listen())
        .post('/ignore')
        .end(function(){});
    });

    it('should work when use fs.createWriteStream', function(done){
        let app = koa();
        let optts = {
            handle: fs.createWriteStream('test.txt')
        };

        app.use(log('tiny', optts));

        request(app.listen())
        .post('/ignore')
        .end(function(){
            setTimeout(function(){
                try{
                    fs.statSync('test.txt');
                    fs.unlinkSync('test.txt');
                }catch(e){
                    // no file just throw
                    expect(e).to.be.undefined;
                }
                done();
            }, 10);
        });
    });

    it('should work when use process.stdout', function(done){
        let optts = {
            handle: process.stdout
        };

        app.use(log('tiny', optts));

        request(app.listen())
        .post('/ignore')
        .end(done);
    });

    it('should not show response-time', function(done){
        let app = koa();
        app.use(log('tiny', opts));
        app.use(function *(){
            delete this.req.start_at;
        });

        request(app.listen())
        .post('/ignore')
        .end(function(){
            let params = str.split(' ');
            expect(params.indexOf('') !== -1).to.be.true;
            done();
        });
    });
});