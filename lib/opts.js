'use strict';

/**
 * filter request log param
 */
let allowTypes = ['console','file', 'both'],
	allowFields = [
		'method',
		'url',
		'status',
		'duration',
		query,
		ip,
		protocol,
		acceptsCharsets,
		acceptsEncodings
	];

module.exports = (options) => {
	let type, path, highlight, duration, fields, contrast;

	options = options || {};

	type = options.type || 'console';
	path = options.path || './logs/request.log';
	contrast = options.contrast || 'white';
	highlight = options.highlight || {
		field: 'duration',
		color: 'green'
	};
	duration = options.duration || {
		use: false,
		warning: 30, // ms units
		danger: 50
	};
	fields = options.fields || ['method', 'url', 'status', 'duration'];

	// type check
	if(allowTypes.indexOf(type) === -1){
		throw new Error(`${type} is not allowed`);
	}

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
		type: type, 
		path: path,
		contrast: contrast,
		highlight: highlight, 
		duration: duration, 
		fields: nFields
	};
};