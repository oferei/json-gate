// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	schemaShouldBeValid = common.schemaShouldBeValid,
	schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaValidSimple = {
	type: 'object',
	dependencies: {
		a: 'b'
	}
};

var schemaInvalidSimple = {
	type: 'object',
	dependencies: {
		a: 3
	}
};

var schemaValidSimpleTuple = {
	type: 'object',
	dependencies: {
		a: ['b', 'c', 'd']
	}
};

var schemaInvalidSimpleTuple = {
	type: 'object',
	dependencies: {
		a: ['b', 'c', 3]
	}
};

var schemaValidSchema = {
	type: 'object',
	dependencies: {
		a: { type: 'integer' }
	}
};

var schemaInvalidSchema = {
	type: 'object',
	dependencies: {
		a: { type: 3 }
	}
};

var schemaInvalid = {
	type: 'object',
	dependencies: 3
};

vows.describe('Schema Dependencies').addBatch({
	'when simple dependency is valid': schemaShouldBeValid(schemaValidSimple),
	'when simple dependency is invalid': schemaShouldBeInvalid(schemaInvalidSimple, { errMsg: 'Schema: \'dependencies\' attribute: value of property \'a\' is an integer when it should be either a string, an array or an object (schema)' }),
	'when simple tuple dependency is valid': schemaShouldBeValid(schemaValidSimpleTuple),
	'when simple tuple dependency is invalid': schemaShouldBeInvalid(schemaInvalidSimpleTuple, { errMsg: 'Schema: \'dependencies\' attribute: value of property \'a\' element 2 is an integer when it should be a string' }),
	'when schema dependency is valid': schemaShouldBeValid(schemaValidSchema),
	'when schema dependency is invalid': schemaShouldBeInvalid(schemaInvalidSchema, { errMsg: 'Schema: \'dependencies\' attribute: value of property \'a\' is not a valid schema: Schema: \'type\' attribute is an integer when it should be either a string or an array' }),
	'when dependencies is not an object': schemaShouldBeInvalid(schemaInvalid, { errMsg: 'Schema: \'dependencies\' attribute is an integer when it should be an object' })
}).export(module);

