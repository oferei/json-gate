// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var jsonly = require('..');

var objWithoutProperty = {
};

var objWithProperty = {
	s: 'I am'
};

var schema = {
	type: 'object',
	properties: {
		s: {
			type: 'string',
			default: 'the-default-value'
		}
	}
};

var schemaInvalidDefault = {
	type: 'object',
	properties: {
		s: {
			type: 'string',
			default: 42
		}
	}
};

vows.describe('Object').addBatch({
	'when property exists': {
		topic: function () {
			jsonly(objWithProperty, schema, this.callback);
		},
		'it is not changed': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			console.log('*** result:', result);
			result.should.have.property('s', 'I am');
		}
	}
}).addBatch({
	'when default value type is wrong': {
		topic: function () {
			jsonly(objWithoutProperty, schemaInvalidDefault, this.callback);
		},
		'we get an error': function (err, result) {
			should.exist(err);
			should.not.exist(result);
			console.log('Error:', err)
		}
	}
}).addBatch({
	'when property is missing': {
		topic: function () {
			jsonly(objWithoutProperty, schema, this.callback);
		},
		'we get the default value': function (err, result) {
			should.not.exist(err);
			should.exist(result);
			console.log('*** result:', result);
			result.should.have.property('s', 'the-default-value');
			result.should.equal(objWithoutProperty);
		}
	}
}).export(module);
