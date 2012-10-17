// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	schemaShouldBeValid = common.schemaShouldBeValid,
	schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaValid = {
	type: 'object',
	properties: {
		str: {
			type: 'string'
		},
		num: {
			type: 'number'
		},
		int: {
			type: 'integer'
		},
		bool: {
			type: 'boolean'
		},
		obj: {
			type: 'object'
		},
		arr: {
			type: 'array'
		},
		z: {
			type: 'null'
		},
		value: {
			type: 'any'
		}
	}
};

var schemaInvalid = {
	type: 'object',
	properties: {
		seven: {
			type: 7
		}
	}
};

var schemaSimpleUnionType = {
	type: 'object',
	properties: {
		nullable: {
			type: ['string', 'null']
		}
	}
};

var schemaInvalidUnionTypeWithOnlyOne = {
	type: 'object',
	properties: {
		schizo: {
			type: ['string']
		}
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
	'when attribute is neither a string nor an array': schemaShouldBeInvalid(schemaInvalid),
	'when attribute is a union type with simple types': schemaShouldBeValid(schemaSimpleUnionType),
	'when attribute is a union type with only one simple type': schemaShouldBeInvalid(schemaInvalidUnionTypeWithOnlyOne),
	'when attribute is a union type with a valid schema': schemaShouldBeValid(schemaUnionTypeWithValidSchema),
	'when attribute is a union type with an invalid schema': schemaShouldBeInvalid(schemaUnionTypeWithInvalidSchema)
}).export(module);
