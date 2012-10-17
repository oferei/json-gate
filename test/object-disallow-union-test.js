// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	objectShouldBeValid = common.objectShouldBeValid,
	objectShouldBeInvalid = common.objectShouldBeInvalid;

var objString = {
	nullable: 'I am'
};

var objNull = {
	nullable: null
};

var objInteger = {
	nullable: 42
};

var schemaUnionType = {
	type: 'object',
	properties: {
		nullable: {
			disallow: ['string', 'null']
		}
	}
};

var objMan = {
	nullable: {
		name: 'John',
		age: 42
	}
};

var objWoman = {
	nullable: {
		name: 'Jane',
		age: 'confidential'
	}
};

var objAlien = {
	nullable: {
		name: 'Paul',
		age: true
	}
}

var schemaHuman = {
	type: 'object',
	properties: {
		name: {
			type: 'string',
			required: true
		},
		age: {
			type: ['integer', 'string'],
			required: true
		}
	}
};

var schemaUnionTypeWithSchema = {
	type: 'object',
	properties: {
		nullable: {
			disallow: ['string', 'null', schemaHuman],
			required: true
		}
	}
};

vows.describe('Object Type').addBatch({
	'when a string is passed for neither a string nor a null': objectShouldBeInvalid(objString, schemaUnionType),
	'when a null is passed for neither a string nor a null': objectShouldBeInvalid(objNull, schemaUnionType),
	'when trying to pass an integer for neither a string nor a null': objectShouldBeValid(objInteger, schemaUnionType),
	'when a string is passed for neither a string nor a null nor a human': objectShouldBeInvalid(objString, schemaUnionTypeWithSchema),
	'when a null is passed for neither a string nor a null nor a human': objectShouldBeInvalid(objNull, schemaUnionTypeWithSchema),
	'when a man is passed for neither a string nor a null nor a human': objectShouldBeInvalid(objMan, schemaUnionTypeWithSchema),
	'when a woman is passed for neither a string nor a null nor a human': objectShouldBeInvalid(objWoman, schemaUnionTypeWithSchema),
	'when trying to pass an alien for neither a string nor a null nor a human': objectShouldBeValid(objAlien, schemaUnionTypeWithSchema)
}).export(module);
