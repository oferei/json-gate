// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	objectShouldBeValid = common.objectShouldBeValid,
	objectShouldBeInvalid = common.objectShouldBeInvalid;

var objA = {
	a: 1
};

var objAB = {
	a: 1,
	b: 2
};

var objABBool = {
	a: 1,
	b: false
};

var objABCD = {
	a: 1,
	b: 2,
	c: 3,
	d: 4
};

var schemaSimple = {
	type: 'object',
	dependencies: {
		a: 'b'
	}
};

var schemaSimpleTuple = {
	type: 'object',
	dependencies: {
		a: ['b', 'c', 'd']
	}
};

var schemaSchema = {
	type: 'object',
	dependencies: {
		a: { properties: { b: { type: 'integer' }}}
	}
};

vows.describe('Object Dependencies').addBatch({
	'when simple dependency is satisfied': objectShouldBeValid(objAB, schemaSimple),
	'when simple dependency is not satisfied': objectShouldBeInvalid(objA, schemaSimple, { errMsg: 'JSON object property \'b\' is required by property \'a\'' }),
	'when simple tuple dependency is satisfied': objectShouldBeValid(objABCD, schemaSimpleTuple),
	'when simple tuple dependency is not satisfied': objectShouldBeInvalid(objAB, schemaSimpleTuple, { errMsg: 'JSON object property \'c\' is required by property \'a\'' }),
	'when schema dependency is satisfied': objectShouldBeValid(objAB, schemaSchema),
	'when schema dependency is not satisfied': objectShouldBeInvalid(objABBool, schemaSchema, { errMsg: 'JSON object property \'[dependencies.a].b\' is a boolean when it should be an integer' })
}).export(module);
