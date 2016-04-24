'use strict';

/**
 * filter request log param
 */
let allowFields = [
		'method',
		'url',
		'status',
		'duration',
		'query',
		'ip',
		'protocol',
		'acceptsCharsets',
		'acceptsEncodings'
	];

module.exports = (options) => {
	let highlight, duration, fields, contrast;

	options = options || {};
	contrast = options.contrast || 'white';
	highlight = options.highlight || {
		field: 'duration',
		color: 'green'
	};
	duration = options.duration || {
		use: true,
		warning: 30, // ms units
		danger: 50
	};
	fields = options.fields || ['method', 'url', 'status', 'duration'];

	// duration check
	if(typeof duration === 'object'
		&& duration.using){
		let warn = parseInt(duration.warning, 10),
			danger = parseInt(duration.danger, 10);

		duration.warning = (warn ? warn : 30);
		duration.danger = (danger ? danger : 50);
	}

	// fields check
	let len = (fields ? fields : []).length,
		nFields = [];
		
	for(let i = 0; i < len; i++){
		if(allowFields.indexOf(fields[i]) !== -1){
			nFields.push(fields[i]);
		}
	}

	return {
		contrast: contrast,
		highlight: highlight, 
		duration: duration, 
		fields: nFields
	};
};