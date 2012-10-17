var should = require('should');

var createSchema = require('..').createSchema,
	config = require('./config');

exports.schemaShouldBeValid = function (schema, options) {
	var context = {
		topic: function () {
			try {
				this.callback(null, createSchema(schema));
			} catch(err) {
				this.callback(err);
			}
		}
	};
	var vow = (options && options.vow) || 'we get no error';
	context[vow] = function (err, schema) {
		should.not.exist(err);
		should.exist(schema);
		schema.should.not.be.instanceof(Error); // can't trust vows
		if (options && options.post) { options.post(err, schema); }
	};
	return context;
};

exports.schemaShouldBeInvalid = function (schema, options) {
	var context = {
		topic: function () {
			try {
				this.callback(null, createSchema(schema));
			} catch(err) {
				this.callback(err);
			}
		}
	};
	var vow = (options && options.vow) || 'we get an error';
	context[vow] = function (err, schema) {
		should.exist(err);
		err.should.be.instanceof(Error); // can't trust vows
		if (config.verbose) {
			console.log('Error:', err)
		}
		if (options && options.post) { options.post(err, schema); }
	};
	return context;
};

exports.objectShouldBeValid = function (obj, schemaDef, options) {
	var context = {
		topic: function () {
			var schema = createSchema(schemaDef);
			schema.validate(obj, this.callback);
		}
	};
	var vow = (options && options.vow) || 'we get no error';
	context[vow] = function (err, result) {
		should.not.exist(err);
		should.exist(result);
		result.should.not.be.instanceof(Error); // can't trust vows
		result.should.equal(obj);
		if (options && options.post) { options.post(err, result); }
	};
	return context;
};

exports.objectShouldBeInvalid = function (obj, schemaDef, options) {
	var context = {
		topic: function () {
			var schema = createSchema(schemaDef);
			schema.validate(obj, this.callback);
		}
	};
	var vow = (options && options.vow) || 'we get an error';
	context[vow] = function (err, result) {
		should.exist(err);
		err.should.be.instanceof(Error); // can't trust vows
		should.not.exist(result);
		if (config.verbose) {
			console.log('Error:', err)
		}
		if (options && options.post) { options.post(err, result); }
	};
	return context;
};
