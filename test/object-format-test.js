// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	objectShouldBeValid = common.objectShouldBeValid,
	objectShouldBeInvalid = common.objectShouldBeInvalid;

var objDateTime = {
	dateTime: '2012-11-06T09:13:24Z'
};

var objDateTimeFractionDot = {
	dateTime: '2012-11-06T09:13:24.142857Z'
};

var objDateTimeFractionComma = {
	dateTime: '2012-11-06T09:13:24,142857Z'
};

var objDateTimeWithAheadOffset = {
	dateTime: '2016-10-18T11:11:11.616+05'
};

var objDateTimeWithBehindOffset = {
	dateTime: '2016-10-18T11:11:11.616-05'
};

var objInvalidDateTime = {
	dateTime: '2012-11-06'
};

var objDate = {
	date: '2012-11-06'
};

var objInvalidDate = {
	date: '09:13:24'
};

var objTime = {
	time: '09:13:24'
};

var objInvalidTime = {
	time: '^[A-Fa-f0-9]{12}$'
};

var objMsInt = {
	ms: 1000
};

var objMsNum = {
	ms: 1000.0
};

var objRegex = {
	re: '^[A-Fa-f0-9]{12}$'
};

var objInvalidRegex = {
	re: '['
};

var objColorPreDef = {
	color: 'green'
};

var objColorHex3 = {
	color: '#0f8'
};

var objColorHex6 = {
	color: '#00ff69'
};

var objColorRgbNum = {
	color: 'rgb(255, 0, 128)'
};

var objColorRgbPerc = {
	color: 'rgb(100%, 0%, 50%)'
};

var objInvalidColor = {
	color: 'color: green'
};

var objStyle = {
	style: 'color: blue'
};

var objInvalidStyle = {
	style: '+31 42 123 4567'
};

var objPhoneNational = {
	phone: '(42) 123 4567'
};

var objPhoneInternational = {
	phone: '+31 42 123 4567'
};

var objInvalidPhone = {
	phone: 'http://en.wikipedia.org/wiki/E.123'
};

var objUri = {
	uri: 'https://npmjs.org/package/json-gate'
};

var objInvalidUri = {
	uri: 'info@facebook.com'
};

var objEmail = {
	email: 'info@google.com'
};

var objInvalidEmail = {
	email: '127.0.0.1'
};

var objIp4 = {
	ip4: '192.168.1.1'
};

var objInvalidIp4 = {
	ip4: '2001:0db8:85a3:0042:0000:8a2e:0370:7334'
};

var objIp6 = {
	ip6: '2001:0db8:85a3:0042:0000:8a2e:0370:7334'
};

var objInvalidIp6 = {
	ip6: 'localhost'
};

var objHost = {
	host: 'localhost'
};

var objInvalidHost = {
	host: '2012-11-06T09:13:24Z'
};

var schemaDateTime = {
	type: 'object',
	properties: {
		dateTime: {
			type: 'string',
			format: 'date-time',
			required: true
		}
	}
};

var schemaDate = {
	type: 'object',
	properties: {
		date: {
			type: 'string',
			format: 'date',
			required: true
		}
	}
};

var schemaTime = {
	type: 'object',
	properties: {
		time: {
			type: 'string',
			format: 'time',
			required: true
		}
	}
};

var schemaMsInt = {
	type: 'object',
	properties: {
		ms: {
			type: 'integer',
			format: 'utc-millisec',
			required: true
		}
	}
};

var schemaMsNum = {
	type: 'object',
	properties: {
		ms: {
			type: 'number',
			format: 'utc-millisec',
			required: true
		}
	}
};

var schemaRegex = {
	type: 'object',
	properties: {
		re: {
			type: 'string',
			format: 'regex',
			required: true
		}
	}
};

var schemaColor = {
	type: 'object',
	properties: {
		color: {
			type: 'string',
			format: 'color',
			required: true
		}
	}
};

var schemaStyle = {
	type: 'object',
	properties: {
		style: {
			type: 'string',
			format: 'style',
			required: true
		}
	}
};

var schemaPhone = {
	type: 'object',
	properties: {
		phone: {
			type: 'string',
			format: 'phone',
			required: true
		}
	}
};

var schemaUri = {
	type: 'object',
	properties: {
		uri: {
			type: 'string',
			format: 'uri',
			required: true
		}
	}
};

var schemaEmail = {
	type: 'object',
	properties: {
		email: {
			type: 'string',
			format: 'email',
			required: true
		}
	}
};

var schemaIp4 = {
	type: 'object',
	properties: {
		ip4: {
			type: 'string',
			format: 'ip-address',
			required: true
		}
	}
};

var schemaIp6 = {
	type: 'object',
	properties: {
		ip6: {
			type: 'string',
			format: 'ipv6',
			required: true
		}
	}
};

var schemaHost = {
	type: 'object',
	properties: {
		host: {
			type: 'string',
			format: 'host-name',
			required: true
		}
	}
};

var objProprietary = {
	prop: 'la la la'
};

var schemaProprietary = {
	type: 'object',
	properties: {
		prop: {
			type: 'string',
			format: 'my-format',
			required: true
		}
	}
};

vows.describe('Object Format').addBatch({
	'when a date-time is passed for a date-time': objectShouldBeValid(objDateTime, schemaDateTime),
	'when a date-time with a dot fraction is passed for a date-time': objectShouldBeValid(objDateTimeFractionDot, schemaDateTime),
	'when a date-time with a comma fraction is passed for a date-time': objectShouldBeValid(objDateTimeFractionComma, schemaDateTime),
	'when a date-time with a ahead offset is passed for a date-time': objectShouldBeValid(objDateTimeWithAheadOffset, schemaDateTime),
	'when a date-time with a behind offset is passed for a date-time': objectShouldBeValid(objDateTimeWithBehindOffset, schemaDateTime),
	'when a date-time is passed for a date-time': objectShouldBeValid(objDateTime, schemaDateTime),
	'when trying to pass a date for a date-time': objectShouldBeInvalid(objInvalidDateTime, schemaDateTime, { errMsg: 'JSON object property \'dateTime\' does not conform to the \'date-time\' format' }),
	'when a date is passed for a date': objectShouldBeValid(objDate, schemaDate),
	'when trying to pass a time for a date': objectShouldBeInvalid(objInvalidDate, schemaDate, { errMsg: 'JSON object property \'date\' does not conform to the \'date\' format' }),
	'when a time is passed for a time': objectShouldBeValid(objTime, schemaTime),
	'when trying to pass a regex for a time': objectShouldBeInvalid(objInvalidTime, schemaTime, { errMsg: 'JSON object property \'time\' does not conform to the \'time\' format' }),
	'when an integer utc-millisec is passed for an integer utc-millisec': objectShouldBeValid(objMsInt, schemaMsInt),
	'when a number utc-millisec is passed for a number utc-millisec': objectShouldBeValid(objMsNum, schemaMsNum),
	'when a regex is passed for a regex': objectShouldBeValid(objRegex, schemaRegex),
	'when trying to pass an invalid regex for a regex': objectShouldBeInvalid(objInvalidRegex, schemaRegex, { errMsg: 'JSON object property \'re\' does not conform to the \'regex\' format' }),
	'when a predefined color is passed for a color': objectShouldBeValid(objColorPreDef, schemaColor),
	'when a 3-hex-digit color is passed for a color': objectShouldBeValid(objColorHex3, schemaColor),
	'when a 6-hex-digit color is passed for a color': objectShouldBeValid(objColorHex6, schemaColor),
	'when a numeric rgb color is passed for a color': objectShouldBeValid(objColorRgbNum, schemaColor),
	'when a percentile rgb color is passed for a color': objectShouldBeValid(objColorRgbPerc, schemaColor),
	'when trying to pass a style for a color': objectShouldBeInvalid(objInvalidColor, schemaColor, { errMsg: 'JSON object property \'color\' does not conform to the \'color\' format' }),
	//'when a style is passed for a style': objectShouldBeValid(objStyle, schemaStyle),
	//'when trying to pass a phone for a style': objectShouldBeInvalid(objInvalidStyle, schemaStyle, { errMsg: 'JSON object property \'style\' does not conform to the \'style\' format' }),
	'when a national phone is passed for a phone': objectShouldBeValid(objPhoneNational, schemaPhone),
	'when a internation phone is passed for a phone': objectShouldBeValid(objPhoneInternational, schemaPhone),
	'when trying to pass a uri for a phone': objectShouldBeInvalid(objInvalidPhone, schemaPhone, { errMsg: 'JSON object property \'phone\' does not conform to the \'phone\' format' }),
	'when a uri is passed for a uri': objectShouldBeValid(objUri, schemaUri),
	'when trying to pass an email for a uri': objectShouldBeInvalid(objInvalidUri, schemaUri, { errMsg: 'JSON object property \'uri\' does not conform to the \'uri\' format' }),
	'when an email is passed for an email': objectShouldBeValid(objEmail, schemaEmail),
	'when trying to pass an ip-address for an email': objectShouldBeInvalid(objInvalidEmail, schemaEmail, { errMsg: 'JSON object property \'email\' does not conform to the \'email\' format' }),
	'when an ip-address is passed for an ip-address': objectShouldBeValid(objIp4, schemaIp4),
	'when trying to pass an ipv6 for an ip-address': objectShouldBeInvalid(objInvalidIp4, schemaIp4, { errMsg: 'JSON object property \'ip4\' does not conform to the \'ip-address\' format' }),
	'when an ipv6 is passed for an ipv6': objectShouldBeValid(objIp6, schemaIp6),
	'when trying to pass a host-name for an ipv6': objectShouldBeInvalid(objInvalidIp6, schemaIp6, { errMsg: 'JSON object property \'ip6\' does not conform to the \'ipv6\' format' }),
	'when a host-name is passed for a host-name': objectShouldBeValid(objHost, schemaHost),
	'when trying to pass a date-time for a host-name': objectShouldBeInvalid(objInvalidHost, schemaHost, { errMsg: 'JSON object property \'host\' does not conform to the \'host-name\' format' }),
	'when format is unknown': objectShouldBeValid(objProprietary, schemaProprietary)
}).export(module);
