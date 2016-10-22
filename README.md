# koa-logs

[![Build Status](https://travis-ci.org/hardog/koa-logs.svg?branch=v2)](https://travis-ci.org/hardog/koa-logs)
[![Coverage Status](https://img.shields.io/codecov/c/github/hardog/koa-logs/v2.svg)](https://codecov.io/github/hardog/koa-logs/branch/v2)
[![License](https://img.shields.io/npm/l/koa-logs.svg)](https://www.npmjs.com/package/koa-logs)
[![npm Version](https://img.shields.io/npm/v/koa-logs.svg)](https://www.npmjs.com/package/koa-logs)

a simple middleware for record koa logs!


# Features

- support logs type(process.stdout, stream, console)
- suport kinds of type(`tiny`, WTODO More)


# Usage

## use default output `console.log`

```
let app = koa();
app.use(log());
app.listen(3000);
```
## use output `process.stdout`

```
let app = koa();
app.use(log('tiny', {
    handle: process.stdout
}));
app.listen(3000);
```

## use output `fs.createWriteStream`

```
let app = koa();
app.use(log('tiny', {
    handle: fs.createWriteStream(path)
}));
app.listen(3000);
```

## use `skip`

```
let app = koa();
app.use(log('tiny', {
    handle: fs.createWriteStream(path),
    skip: function(ctx){
        if(ctx.url === '/ignore'){
            return true;
        }else{
            return false;
        }
    }
}
}));
app.listen(3000);
```


# Install

```
$ npm install koa-logs -g
```

# Test

```
$ npm test
$ npm run cover
$ npm run lint
```

## License

[MIT](https://github.com/hardog/koa-logs/blob/master/LICENSE)