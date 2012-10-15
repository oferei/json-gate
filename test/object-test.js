// this test is run by Vows (as all files matching *test.js)

var vows = require('vows'),
	should = require('should');

var jsonly = require('..');

var obj = {
	s: 'Hello, JSON only',
	n: 1.618033988749895,
	i: 108,
	b: true,
	o: {},
	a: [],
	z: null
};

var schemaCorrect = {
	type: 'object',
	properties: {
		s: {
			type: 'string',
			required: true
		},
		n: {
			type: 'number',
			required: true
		},
		i: {
			type: 'integer',
			required: true
		},
		b: {
			type: 'boolean',
			required: true
		},
		o: {
			type: 'object',
			required: true
		},
		a: {
			type: 'array',
			required: true
		},
		z: {
			type: 'null',
			required: true
		}
	}
};

vows.describe('Object').addBatch({
	'when validating empty object': {
		topic: function () {
			jsonly({}, {type: 'object'}, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
		}
	}
}).addBatch({
	'when validating properties': {
		topic: function () {
			jsonly(obj, schemaCorrect, this.callback);
		},
		'we get no error': function (err, result) {
			should.not.exist(err);
		}
	}
}).export(module);
