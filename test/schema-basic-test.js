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

vows.describe('Schema Basic').addBatch({
	'when schema is undefined': schemaShouldBeInvalid(undefined),
	'when schema is not an object': schemaShouldBeInvalid(schemaNotAnObject),
	'when type attribue is missing': schemaShouldBeInvalid(schemaWithoutType),
	'when type attribute is not a string': schemaShouldBeInvalid(schemaInvalidType),
	'when type attribute is neither \'object\' nor \'array\'': schemaShouldBeInvalid(schemaInappropriateType),
	'when type attribute is \'object\'': schemaShouldBeValid(schemaEmptyObject),
	'when type attribute is \'array\'': schemaShouldBeValid(schemaEmptyArray)
}).export(module);
