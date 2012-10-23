// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	schemaShouldBeValid = common.schemaShouldBeValid,
	schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaValid = {
	type: 'object',
	properties: {
		str: { type: 'string' },
		num: { type: 'number' },
		int: { type: 'integer' },
		bool: { type: 'boolean' },
		obj: { type: 'object' },
		arr: { type: 'array' },
		z: { type: 'null' },
		value: { type: 'any' }
	}
};

var schemaInvalid = {
	type: 'object',
	properties: {
		seven: { type: 7 }
	}
};

var schemaSimpleUnionType = {
	type: 'object',
	properties: {
		nullable: { type: ['string', 'null'] }
	}
};

var schemaInvalidUnionTypeWithOnlyOne = {
	type: 'object',
	properties: {
		schizo: { type: ['string'] }
	}
};

var schemaUnionTypeWithValidSchema = {
	type: 'object',
	properties: {
		deep: {
			type: ['string',
				{
					type: 'object',
					properties: {
						num: { type: 'number' }
					}
				}
			]
		}
	}
};

var schemaUnionTypeWithInvalidSchema = {
	type: 'object',
	properties: {
		deep: {
			type: ['string',
				{
					type: 'object',
					properties: {
						num: {
							type: 'number',
							minimum: 'dog'
						}
					}
				}
			]
		}
	}
};

vows.describe('Schema Type').addBatch({
	'when attributes are all simple types': schemaShouldBeValid(schemaValid),
	'when attribute is neither a string nor an array': schemaShouldBeInvalid(schemaInvalid, { errMsg: 'Schema property \'seven\': \'type\' attribute is an integer when it should be either a string or an array' }),
	'when attribute is a union type with simple types': schemaShouldBeValid(schemaSimpleUnionType),
	'when attribute is a union type with only one simple type': schemaShouldBeInvalid(schemaInvalidUnionTypeWithOnlyOne, { errMsg: 'Schema property \'schizo\': \'type\' attribute union length is 1 when it should be at least 2' }),
	'when attribute is a union type with a valid schema': schemaShouldBeValid(schemaUnionTypeWithValidSchema),
	'when attribute is a union type with an invalid schema': schemaShouldBeInvalid(schemaUnionTypeWithInvalidSchema, { errMsg: 'Schema property \'deep\': \'type\' attribute union element 1 is not a valid schema: Schema property \'num\': \'minimum\' attribute is a string when it should be a number' })
}).export(module);
