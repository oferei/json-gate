// this test is run by Vows (as all files matching *test.js)

var vows = require('vows');

var common = require('./common'),
    schemaShouldBeValid = common.schemaShouldBeValid,
    schemaShouldBeInvalid = common.schemaShouldBeInvalid;

var schemaValidSchema = {
    type: 'object',
    atLeastOne: ['attribute', 'attribute2']
};

var schemaInvalidSchema = {
    type: 'object',
    atLeastOne: ['attribute']
};

var schemaTypeInvalidSchema = {
    type: 'object',
    atLeastOne: [1, 1]
};

vows.describe('Schema Dependencies').addBatch({
    'when schema atLeastOne is valid': schemaShouldBeValid(schemaValidSchema),
    'when schema atLeastOne is invalid': schemaShouldBeInvalid(schemaInvalidSchema, { errMsg: 'Schema: \'atLeastOne\' attribute: requires two or more items' }),
    'when schema type atLeastOne is invalid': schemaShouldBeInvalid(schemaTypeInvalidSchema, { errMsg: 'Schema: \'atLeastOne\' attribute: value \'1\' is an integer when it should be either a string' })
}).export(module);

