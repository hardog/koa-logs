# koa-request-log

a middleware for koa request logs

# Installation

`$ npm install koa-request-log`

# Key features

- log request include method、url、ip etc.
- log response include duration etc.
- hightlight key field(one of `mthod/url/ip etc.`)
- log into file 、just console or both

# Log Fields

- url
- status
- duration
- method(get/post/delete etc.)
- `ip`
- `query`
- `protocol`
- `acceptsCharsets`
- `acceptsEncodings`
- etc.

# Usage

just require the package after routes

# Demo

```
let koa = require('koa'),
	requestLog = require('koa-request-log'),
	routes = require('./routes'),
	app = new koa();

app
.use(routes)
.use(requestLog());

app.listen(3000);
```

## License

(The MIT License)