// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	schemaShouldBeValid = common.schemaShouldBeValid,
	schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaValidItems = {
	type: 'array',
	items: { type: 'string' }
};

var schemaValidItemsTuple = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' },
		{ type: 'integer' },
		{ type: 'boolean' }
	]
};

var schemaValidItemsTupleWithProperties = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' },
		{
			type: 'object',
			properties: {
				str: { type: 'string' },
				num: { type: 'number' }
			}
		},
		{ type: 'integer' }
	]
};

var schemaInvalidItemsString = {
	type: 'array',
	items: 'string'
};

var schemaInvalidItemsArray = {
	type: 'array',
	items: ['string', 'integer']
};

var schemaInvalidItemsInvalidSchema = {
	type: 'array',
	items: { type: 3 }
};

var schemaInvalidItemsTupleWithInvalidProperties = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' },
		{
			type: 'object',
			properties: {
				str: { type: 'string' },
				num: { type: 3 }
			}
		},
		{ type: 'integer' }
	]
};

var schemaValidAdditionalItems = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' }
	],
	additionalItems: { type: 'boolean' }
};

var schemaValidAdditionalItemsInvalidSchema = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' }
	],
	additionalItems: { type: 3 }
};

var schemaValidNoAdditionalItems = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' }
	],
	additionalItems: false
};

var schemaInvalidAdditionalItemsTrue = {
	type: 'array',
	items: [
		{ type: 'string' },
		{ type: 'integer' }
	],
	additionalItems: true
};

var schemaSuperfluousAdditionalItemsNonTuple = {
	type: 'array',
	items: { type: 'string' },
	additionalItems: false
};

var schemaValidUniqueItems = {
	type: 'array',
	items: { type: 'string' },
	uniqueItems: true
};

var schemaInvalidUniqueItems = {
	type: 'array',
	items: { type: 'string' },
	uniqueItems: 5
};

vows.describe('Schema Array').addBatch({
	'when items is a schema': schemaShouldBeValid(schemaValidItems),
	'when items is a tuple': schemaShouldBeValid(schemaValidItemsTuple),
	'when items is a tuple containing properties': schemaShouldBeValid(schemaValidItemsTupleWithProperties),
	'when items is a string': schemaShouldBeInvalid(schemaInvalidItemsString, { errMsg: 'Schema: \'items\' attribute is a string when it should be either an object (schema) or an array' }),
	'when items is an array with strings': schemaShouldBeInvalid(schemaInvalidItemsArray, { errMsg: 'Schema: \'items\' attribute element 0 is not a valid schema: Schema is a string when it should be an object' }),
	'when items is an invalid schema': schemaShouldBeInvalid(schemaInvalidItemsInvalidSchema, { errMsg: 'Schema: \'items\' attribute is not a valid schema: Schema: \'type\' attribute is an integer when it should be either a string or an array' }),
	'when items array contains an invalid schema': schemaShouldBeInvalid(schemaInvalidItemsTupleWithInvalidProperties, { errMsg: 'Schema: \'items\' attribute element 2 is not a valid schema: Schema property \'num\': \'type\' attribute is an integer when it should be either a string or an array' }),
	'when additionalItems is a valid schema': schemaShouldBeValid(schemaValidAdditionalItems),
	'when additionalItems is an invalid schema': schemaShouldBeInvalid(schemaValidAdditionalItemsInvalidSchema, { errMsg: 'Schema: \'additionalItems\' attribute is not a valid schema: Schema: \'type\' attribute is an integer when it should be either a string or an array' }),
	'when additionalItems is false': schemaShouldBeValid(schemaValidNoAdditionalItems),
	'when additionalItems is true': schemaShouldBeInvalid(schemaInvalidAdditionalItemsTrue, { errMsg: 'Schema: \'additionalItems\' attribute is a boolean when it should be either an object (schema) or false' }),
	'when additionalItems is provided although items is not a tuple': schemaShouldBeValid(schemaSuperfluousAdditionalItemsNonTuple),
	'when uniqueItems is a boolean': schemaShouldBeValid(schemaValidUniqueItems),
	'when uniqueItems is an integer': schemaShouldBeInvalid(schemaInvalidUniqueItems, { errMsg: 'Schema: \'uniqueItems\' attribute is an integer when it should be a boolean' })
}).export(module);
