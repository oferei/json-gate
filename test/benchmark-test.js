// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');
var should = require('should');

// json-gate
var createSchema = require('..').createSchema;
var jsonGateNumSimpleRuns = 200000;
var jsonGateNumComplexRuns = 30000;

// JSV
var JSV = require("JSV").JSV;
var JsvNumSimpleRuns = 10000;
var JsvNumComplexRuns = 2000;

var objSimple = {
	str: 'hi',
	num: 42
};

var schemaSimple = {
	type: 'object',
	properties: {
		str: { type: 'string', required: true },
		num: { type: 'number', required: true }
	}
};

var objComplex = {
	str: 'hello',
	num: 16.2,
	int: 9,
	bool: false,
	arr: [4, 2, 5, 3],
	youtubeVideoId: '9bZkp7q19f0',
	email: 'support@facebook.com',
	primitive: 'walkie talkie',
	weekday: 'Tuesday'
};

var schemaComplex = {
	title: 'complex',
	description: 'A complex schema containg various types and attributes',
	type: 'object',
	properties: {
		str: {
			type: 'string',
			minLength: 3,
			maxLength: 18,
			required: true
		},
		num: {
			type: 'number',
			minimum: 3.14,
			maximum: 31.4,
			required: true
		},
		int: {
			type: 'integer',
			maximum: 42,
			exclusiveMaximum: true,
			divisibleBy: 3,
			required: true
		},
		bool: {
			type: 'boolean',
			required: true
		},
		arr: {
			type: 'array',
			items: { type: 'integer', minimum: 0, maximum: 9 },
			minItems: 2,
			maxItems: 6,
			uniqueItems: true,
			required: true
		},
		youtubeVideoId: {
			type: 'string',
			pattern: '^[A-Za-z0-9_-]{11}$',
			required: true
		},
		email: {
			type: 'string',
			format: 'email',
			required: true
		},
		optional: {
			type: 'integer'
		},
		def: {
			type: ['string', 'null'],
			default: null
		},
		primitive: {
			disallow: ['object', 'array', 'null'],
			required: true
		},
		weekday: {
			enum: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
			required: true
		}
	},
	additionalProperties : false
};

function compareUptimesMs(startTime, finishTime) {
	var diffSeconds = finishTime[0] - startTime[0];
	var diffNanoseconds = finishTime[1] - startTime[1];
	var diff = diffSeconds * 1000 + diffNanoseconds / 1000000;
	return diff;
}

var jsonBmarkSimple;
var JsvBmarkSimple;
var jsonBmarkComplex;
var JsvBmarkComplex;

function round3(num) {
	return Math.round(num * 1000) / 1000;
}

vows.describe('Benchmark').addBatch({
	'when validating simple schema using json-gate': {
		topic: function () {
			var schema = createSchema(schemaSimple);
			var startTime = process.hrtime();
			for (var i = 0; i < jsonGateNumSimpleRuns; ++i) {
				schema.validate(objSimple);
			}
			var finishTime = process.hrtime();
			var diff = compareUptimesMs(startTime, finishTime);
			jsonBmarkSimple = diff / jsonGateNumSimpleRuns;
			console.log('json-gate:', round3(jsonBmarkSimple), 'ms');
			return true;
		},
		'we get no error': function(err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error); // can't trust vows
			result.should.equal(true);
		}
	}
}).addBatch({
	'when validating simple schema using JSV': {
		topic: function () {
			var env = JSV.createEnvironment("json-schema-draft-03");
			var schema = env.createSchema(schemaSimple);
			var startTime = process.hrtime();
			for (var i = 0; i < JsvNumSimpleRuns; ++i) {
				var report = schema.validate(objSimple);
			}
			var finishTime = process.hrtime();
			var diff = compareUptimesMs(startTime, finishTime);
			JsvBmarkSimple = diff / JsvNumSimpleRuns;
			console.log('JSV:', round3(JsvBmarkSimple), 'ms');
			return report;
		},
		'we get no error': function(err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error); // can't trust vows
			result.should.have.property('errors');
			result.errors.should.have.length(0);
		}
	}
}).addBatch({
	'when comparing simple schema validation speeds': {
		topic: function () {
			return JsvBmarkSimple / jsonBmarkSimple;
		},
		'we get no error': function(err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error); // can't trust vows
			result.should.be.a.Number;
			if (result > 1) {
				console.log('json-gate is', round3(result), 'times faster than JSV');
			} else {
				console.log('JSV is', round3(1 / result), 'times faster than json-gate');
			}
		}
	}
}).addBatch({
	'when validating complex schema using json-gate': {
		topic: function () {
			var schema = createSchema(schemaComplex);
			var startTime = process.hrtime();
			for (var i = 0; i < jsonGateNumComplexRuns; ++i) {
				schema.validate(objComplex);
			}
			var finishTime = process.hrtime();
			var diff = compareUptimesMs(startTime, finishTime);
			jsonBmarkComplex = diff / jsonGateNumComplexRuns;
			console.log('json-gate:', round3(jsonBmarkComplex), 'ms');
			return true;
		},
		'we get no error': function(err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error); // can't trust vows
			result.should.equal(true);
		}
	}
}).addBatch({
	'when validating complex schema using JSV': {
		topic: function () {
			var env = JSV.createEnvironment("json-schema-draft-03");
			var schema = env.createSchema(schemaComplex);
			var startTime = process.hrtime();
			for (var i = 0; i < JsvNumComplexRuns; ++i) {
				var report = schema.validate(objComplex);
			}
			var finishTime = process.hrtime();
			var diff = compareUptimesMs(startTime, finishTime);
			JsvBmarkComplex = diff / JsvNumComplexRuns;
			console.log('JSV:', round3(JsvBmarkComplex), 'ms');
			return report;
		},
		'we get no error': function(err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error); // can't trust vows
			result.should.have.property('errors');
			result.errors.should.have.length(0);
		}
	}
}).addBatch({
	'when comparing complex schema validation speeds': {
		topic: function () {
			return JsvBmarkComplex / jsonBmarkComplex;
		},
		'we get no error': function(err, result) {
			should.not.exist(err);
			should.exist(result);
			result.should.not.be.instanceof(Error); // can't trust vows
			result.should.be.a.Number;
			if (result > 1) {
				console.log('json-gate is', round3(result), 'times faster than JSV');
			} else {
				console.log('JSV is', round3(1 / result), 'times faster than json-gate');
			}
		}
	}
}).export(module);
