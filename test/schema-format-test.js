// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	schemaShouldBeValid = common.schemaShouldBeValid,
	schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaValidFormats = {
	type: 'object',
	properties: {
		dateTime: {
			type: 'string',
			format: 'date-time'
		},
		date: {
			type: 'string',
			format: 'date'
		},
		time: {
			type: 'string',
			format: 'time'
		},
		ms: {
			type: 'integer',
			format: 'utc-millisec'
		},
		ms2: {
			type: 'number',
			format: 'utc-millisec'
		},
		re: {
			type: 'string',
			format: 'regex'
		},
		color: {
			type: 'string',
			format: 'color'
		},
		style: {
			type: 'string',
			format: 'style'
		},
		phone: {
			type: 'string',
			format: 'phone'
		},
		uri: {
			type: 'string',
			format: 'uri'
		},
		email: {
			type: 'string',
			format: 'email'
		},
		ip4: {
			type: 'string',
			format: 'ip-address'
		},
		ip6: {
			type: 'string',
			format: 'ipv6'
		},
		host: {
			type: 'string',
			format: 'host-name'
		}
	}
};

var schemaUnknownFormat = {
	type: 'object',
	properties: {
		prop: {
			format: 'my-format'
		}
	}
};

var schemaInvalidFormatType = {
	type: 'object',
	properties: {
		seq: {
			format: [1, 2, 3]
		}
	}
};

var schemaInvalidTypeIp = {
	type: 'object',
	properties: {
		ip: {
			type: 'integer',
			format: 'ip-address'
		}
	}
};

var schemaInvalidTypeMs = {
	type: 'object',
	properties: {
		ms: {
			type: 'string',
			format: 'utc-millisec'
		}
	}
};

vows.describe('Schema Format').addBatch({
	'when formats are valid': schemaShouldBeValid(schemaValidFormats),
	'when format is unknown': schemaShouldBeValid(schemaUnknownFormat),
	'when format is not a string': schemaShouldBeInvalid(schemaInvalidFormatType, { errMsg: 'Schema property \'seq\': \'format\' attribute is an array when it should be a string' }),
	'when \'ip-address\' format is applied to the wrong type': schemaShouldBeInvalid(schemaInvalidTypeIp, { errMsg: 'Schema property \'ip\': \'type\' attribute does not conform to the \'ip-address\' format' }),
	'when \'utc-millisec\' format is applied to the wrong type': schemaShouldBeInvalid(schemaInvalidTypeMs, { errMsg: 'Schema property \'ms\': \'type\' attribute does not conform to the \'utc-millisec\' format' })
}).export(module);
