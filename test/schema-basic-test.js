// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	schemaShouldBeValid = common.schemaShouldBeValid,
	schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaNotAnObject = 'not-an-object';

var schemaWithoutType = {
};

var schemaInvalidType = {
	type: 123
};

var schemaInappropriateType = {
	type: 'string'
};

var schemaEmptyObject = {
	type: 'object'
};

var schemaEmptyArray = {
	type: 'array'
};

var schemaStringOrNull = {
	type: ['string', 'null']
};

vows.describe('Schema Basic').addBatch({
	'when schema is undefined': schemaShouldBeInvalid(undefined, { errMsg: 'Schema is undefined' }),
	'when schema is not an object': schemaShouldBeInvalid(schemaNotAnObject, { errMsg: 'Schema is a string when it should be an object' }),
	'when type attribute is neither a string nor an array': schemaShouldBeInvalid(schemaInvalidType, { errMsg: 'Schema: \'type\' attribute is an integer when it should be either a string or an array' }),
	'when type attribute is \'object\'': schemaShouldBeValid(schemaEmptyObject),
	'when type attribute is \'array\'': schemaShouldBeValid(schemaEmptyArray),
	'when type attribute is a union type with simple types': schemaShouldBeValid(schemaStringOrNull)
}).export(module);
