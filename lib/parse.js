'use strict';

// require default colors
require('colors');

let toDuraColor = (duraConf, value) => {
	value = parseInt(value, 10);

	if(value < duraConf.warning){
		return 'green';
	}else if( value > duraConf.danger){
		return 'red';
	}else{
		return 'yellow';
	}
};

module.exports = (opts, info) => {
	let canUseHighlight = false,
		useDuration = false,
		parsedInfo = [];

	// insure has highlight
	if(typeof opts.highlight === 'object'
		&& opts.highlight.field){
		canUseHighlight = true;
	}

	// insure has duration
	if(typeof opts.duration === 'object'
		&& opts.duration.use){
		useDuration = true;
	}

	info = info || [];
	let len = info.length, color, kv;

	for(let i = 0; i < len; i++){
		color = opts.contrast;
		kv = info[i].split(':');

		if(canUseHighlight
			&& kv[0] === opts.highlight.field){
			color = opts.highlight.color;
		}

		if(useDuration
			&& kv[0] === 'duration'){
			// judge duration
			color = toDuraColor(opts.duration, kv[1]);
		}

		if(kv[0] === 'duration'){ kv[1] = `(${kv[1]}ms)`; }
		parsedInfo.push(String(kv[1])[color]);
	}

	return parsedInfo.join(' ');
};