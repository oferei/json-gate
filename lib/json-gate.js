var validateSchema = require('./valid-schema'),
	validateObject = require('./valid-object');

var Schema = function(schema) {
	this.schema = schema;
	validateSchema(schema);

	this.validate = function(obj, done) {
		validateObject(obj, schema, done);
	}
}

module.exports.createSchema = function (schema) {
	return new Schema(schema);
}
