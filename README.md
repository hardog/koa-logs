## koa-request-log

a middleware for koa request logs

## installation

`$ npm install koa-request-log`

## features

- log request include method、url、ip etc.
- log response include duration、status etc.
- highlight fields, only one
- save to file、console or both

## configuration

```
{
	type: 'console', 			// 'console', file', 'both', default console
	path: './logs/request.log', // actived for file/both type, default ./logs/request.log
	contrast: 'white',			// default white
	hightlight: {
		field: 'status',
		color: 'green'			// provided by colors package
	},
	duration: {
		//color: lt< 30 green, gt>30 & lt<50 yellow, gt>50 red
		use: true/false, 	// default false
		warning: 30, 		// ms as units, default 30
		danger: 50			// default 50
	},
	// it's order decide the terminal show order
	fields: ['method', 'url', 'status', 'duration']
}
```

## log Fields

following list some of koa ctx variable which you can use in koa-request-log

- method
- ip
- query
- url
- protocol
- status
- duration
- acceptsCharsets
- acceptsEncodings

## usage

Just require the package after routes

## demo

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