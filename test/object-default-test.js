// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
	objectShouldBeValid = common.objectShouldBeValid,
	objectShouldBeInvalid = common.objectShouldBeInvalid;

var objWithoutProperty = {
};

var origValue = 'I am';

var objWithProperty = {
	str: origValue
};

var defaultValue = 'the-default-value';

var schemaWithDefault = {
	type: 'object',
	properties: {
		str: {
			type: 'string',
			default: defaultValue
		}
	}
};

vows.describe('Object Default').addBatch({
	'when property exists': objectShouldBeValid(objWithProperty, schemaWithDefault, {
		vow: 'it is not changed',
		post: function (err, result) {
			result.should.have.property('str', origValue);
		}}),
	'when property is missing': objectShouldBeValid(objWithoutProperty, schemaWithDefault, {
		vow: 'we get the default value in-place',
		post: function (err, result) {
			result.should.have.property('str', defaultValue);
		}})
}).export(module);
