# jsonly

_jsonly_ validates JSON objects against a JSON schema.
In other words, it makes sure an object conforms to the type and structure that your code expects.
For example, a server can use it to ensure input received from a client conforms to the API.

The JSON schema can also help with documentation and collaboration. Copy it to your API document and everybody should understand exactly what is expected.

_jsonly_ is extremely easy to use:
* Intuitive - one function to create a schema, one function to use it
* Both synchronous and asynchronous modes - your choice
* Conforms to standard - no surprises
* Well documented, in case you don't feel like digging into the IETF specifications

# What's a JSON schema?

[JSON Schema](http://json-schema.org/) is a proposed Internet draft defining a JSON media type (application/schema+json) with the following goals:
* Validation - You can use JSON Schema to validate your JSON data.
* Documentation - You can extract documentation information from a JSON Schema, match this documentation to your data, and use that information for user interaction.
* Hyperlinking - You can pair your JSON data with the defining JSON Schema to build hyperlinks into parts of that JSON data.

_jsonly_ supports most of [JSON Schema Draft 3](http://tools.ietf.org/html/draft-zyp-json-schema-03), without the hyperlinking part.

## Example

    var createSchema = require('jsonly').createSchema;

    var schema = createSchema({
    	type: 'object',
    	properties: {
    		query: {
    			type: 'string',
                minLength: 1,
                maxLength: 64,
    			required: true
    		},
    		maxResults: {
    			type: 'integer',
    			maximum: 20,
    			default: 10
    		}
    	}
    });

    try {
        schema.validate(input);
    } catch(err) {
        return res.send(400, err); // 400 Bad Request
    }

## Installation

    $ npm install jsonly

## Usage

### _jsonly.createSchema_(jsonSchema)

This function gets a JSON Schema definition and returns a new _Schema_ object.
It may throw an error if the JSON Schema definition is malformed.
The error message will describe exactly what part is invalid.

### _Schema.validate_(jsonObject)

This function gets a JSON object and validates it.
If the JSON object does not conform to the schema, an error is thrown (or returned, see _Synchronous/Asynchronous_ below).
Be aware that the input JSON object may be edited _in-place_ if the _default_ attribute is used.

### Errors

The error messages are human-friendly and detailed.
For example: "JSON object property 'user.password': length is 3 when it should be at least 6".
Ready to be shrink-wrapped and shipped in a 400 Bad Request response!

### Synchronous/Asynchronous

_Schema.validate_ can be called in two ways, to suit your preference.
* Synchronously - as in the example above, with two parameters.
It returns nothing if ok. Otherwise it throws an error.
* Asynchronously - by providing a third parameter: a callback function.
The callback function gets two arguments: error and result (the original JSON object, which may be modified).

It should be noted that the JSON object passed to the callback function is the same as the input JSON object.
It is only passed for convenience.
Any _default_ values used will affect the original JSON object, even when calling asynchronously.

## Hello schema

A _JSON schema_ is defined as a JavaScript object containing various _attributes_.

Let's start by analyzing the schema given in the example above.
* The JSON object should be an object (as opposed to an array)
* It should have a property named _query_, which should be a string with 1 to 64 characters
* It may optionaly have a property named _maxResults_, which should be an integer with a maximum value of 20
* If _maxResults_ is missing, it will be generated with a value of 10

See Attributes section below to learn about more possibilities.

JSON Schema has recursive capabilities. Objects and arrays include other attributes, which may be objects and arrays.
Notice that objects properties are unordered, whereas array items are ordered.

## Attributes

Below are all the supported attributes.

Terminology: for this specification, *instance* refers to a JSON value (object or property) that the schema will be describing and validating.

### type

Defines the expected instance type.

It may be one of the simple type: 'string', 'number', 'integer', 'boolean', 'object', 'array', 'null' or 'any'.

Alternatively _type_ may be an array of simple types and/or schemas. In this case the instance type should be one of the types in the array.
For example, if _type_ is ['string', 'null'] then the instance may be either a string or null.

The default is 'any'.
The top level _type_ must be either 'object' or 'array'.

### required

A boolean indicating whether an instance is mandatory (true) or optional (false).

The default is false (=optional).

### default

TBD

### properties

Applies only to instances of type 'object'.

Defines the properties of the instance object.
Properties are considered unordered, the order of the instance properties may be in any order.

The default is an empty object.

### patternProperties

Applies only to instances of type 'object'.

Not supported yet.

### additionalProperties

Applies only to instances of type 'object'.

Not supported yet.
Behavior is as if it is the default value, an empty schema, which means that
additional properties that are not defined by the _properties_ are allowed.

### dependencies

Applies only to instances of type 'object'.

Not supported yet.

### items

Applies only to instances of type 'array'.

Defines the items of the instance array.

It may be a schema, in which case all the items in the array must be valid according to the schema.

Alternatively _items_ may be an array of schemas.
In this case each position in the instance array must conform to the schema in the corresponding position for this array.
Additional items are allowed, disallowed, or constrained by the _additionalItems_ attribute.

### additionalItems

Applies only to instances of type 'array'.

TBD

### minItems

Applies only to instances of type 'array'.

TBD

### maxItems

Applies only to instances of type 'array'.

TBD

### uniqueItems

Applies only to instances of type 'array'.

Not supported yet.

### minimum

Applies only to instances of type 'number'.

TBD

### exclusiveMinimum

Applies only to instances of type 'number'.

TBD

### maximum

Applies only to instances of type 'number'.

TBD

### exclusiveMaximum

Applies only to instances of type 'number'.

TBD

### divisibleBy

Applies only to instances of type 'number'.

TBD

### minLength

Applies only to instances of type 'string'.

TBD

### maxLength

Applies only to instances of type 'string'.

TBD

### pattern

Applies only to instances of type 'string'.

TBD

### format

Not supported yet.

### enum

Not supported yet.

### disallow

Not supported yet.
