# koa-request-log

## a middleware for koa request logs

# Installation

`$ npm install koa-request-log`

# Key features

- log request include method、url、ip etc.
- log response include time、status etc.
- hightlight key field(one of `mthod/url/ip etc.`)
- log into file or just console

# Log Fields

- Method(GET/POST/DELETE etc.)
- URL
- Response Time
- Status Code
- `ip`
- `query`
- `acceptsCharsets`
- `acceptsEncodings`
- `protocol`
- etc.(Wait to Add)

# Usage

## just require the package after routes

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