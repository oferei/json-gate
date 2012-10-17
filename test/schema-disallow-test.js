// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	schemaShouldBeValid = common.schemaShouldBeValid,
	schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaValid = {
	type: 'object',
	properties: {
		str: {
			disallow: 'string'
		},
		num: {
			disallow: 'number'
		},
		int: {
			disallow: 'integer'
		},
		bool: {
			disallow: 'boolean'
		},
		obj: {
			disallow: 'object'
		},
		arr: {
			disallow: 'array'
		},
		z: {
			disallow: 'null'
		},
		value: {
			disallow: 'any'
		}
	}
};

var schemaInvalid = {
	type: 'object',
	properties: {
		seven: {
			disallow: 7
		}
	}
};

var schemaSimpleUnionType = {
	type: 'object',
	properties: {
		nullable: {
			disallow: ['string', 'null']
		}
	}
};

var schemaInvalidUnionTypeWithOnlyOne = {
	type: 'object',
	properties: {
		schizo: {
			disallow: ['string']
		}
	}
};

var schemaUnionTypeWithValidSchema = {
	type: 'object',
	properties: {
		deep: {
			disallow: ['string',
				{
					type: 'object',
					properties: {
						num: {
							type: 'number'
						}
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
			disallow: ['string',
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

vows.describe('Schema Disallow').addBatch({
	'when attributes are all simple types': schemaShouldBeValid(schemaValid),
	'when attribute is neither a string nor an array': schemaShouldBeInvalid(schemaInvalid),
	'when attribute is a union type with simple types': schemaShouldBeValid(schemaSimpleUnionType),
	'when attribute is a union type with only one simple type': schemaShouldBeInvalid(schemaInvalidUnionTypeWithOnlyOne),
	'when attribute is a union type with a valid schema': schemaShouldBeValid(schemaUnionTypeWithValidSchema),
	'when attribute is a union type with an invalid schema': schemaShouldBeInvalid(schemaUnionTypeWithInvalidSchema)
}).export(module);
