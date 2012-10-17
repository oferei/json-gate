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

## What's a JSON schema?

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
If the JSON object does not conform to the schema an error will be thrown (or returned, see _Synchronous/Asynchronous_ below).
The function does not return a value.
Be aware that the input JSON object may be edited _in-place_ if the _default_ attribute is used.

### Errors

The error messages are human-friendly and detailed.
For example: "JSON object property 'user.password': length is 3 when it should be at least 6".
Ready to be shrink-wrapped and shipped in a 400 Bad Request response!

### Synchronous/Asynchronous

_Schema.validate_ can be called in two ways, to suit your needs:
* Synchronously - as in the example above, with one parameter.
As already stated, it returns nothing if the object checks out. Otherwise it throws an error.
* Asynchronously - by providing a 2nd parameter: a callback function.
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

JSON Schema properties can be nested: objects and arrays include other attributes, which may be objects and arrays.
Notice that objects properties are unordered, whereas array items are ordered.

See Attributes section below to learn about more possibilities.

## Attributes

Below are all the supported attributes.

Terminology: for this specification, *instance* refers to a JSON value (object or property) that the schema will be describing and validating.

### type

Defines the expected instance type.
It can take one of two forms:
* Simple type - any of the following: 'string', 'number', 'integer', 'boolean', 'object', 'array', 'null' or 'any'.
* Union type - an array of simple types and/or schemas. The instance type should be one of the types in the array.
For example, if _type_ is ['string', 'null'] then the instance may be either a string or null.

The default is 'any'.

Note: The top level JSON object's _type_ must be either 'object' or 'array'.

### required

A boolean indicating whether an instance is mandatory (true) or optional (false).

The default is false (optional).

### default

Defines the default value of the instance when the instance is undefined.

The JSON object is edited in-place.
In other words, the default values are set to the original JSON object, not a returned copy.

### properties

Applies only to instances of type `'object'`.

Defines the properties of the instance object.
Properties are considered unordered, the order of the instance properties may be in any order.

The default is an empty object.

### patternProperties

Applies only to instances of type `'object'`.

Not supported yet.

### additionalProperties

Applies only to instances of type `'object'`.

Not supported yet.
Current behavior is as if this attribute was set to the default, an empty schema,
which means that additional properties that are not defined by the _properties_ attribute are allowed.

### dependencies

Applies only to instances of type `'object'`.

Not supported yet.

### items

Applies only to instances of type `'array'`.

Defines the items of the instance array.
It can take one of two forms:
* Schema - all the items in the array must be valid according to the schema.
* Tuple typing - an array of schemas.
Each position in the instance array must conform to the schema in the corresponding position for this array.
Additional items are allowed, disallowed, or constrained by the _additionalItems_ attribute.

### additionalItems

Applies only to instances of type `'array'`, and only together with the _tuple typing_ form of the _items_ attribute.

_additionalItems_ defines the behavior when there are more items in the instance array than in the _items_ array.
It can take one of two forms:
* Schema - all the additional items must be valid according to the schema.
* False - additional items are not allowed.

The default is an empty schema, which allows additional items of any type.

### minItems

Applies only to instances of type `'array'`.

Defines the minimum number of values in an array.

### maxItems

Applies only to instances of type `'array'`.

Defines the maximum number of values in an array.

### uniqueItems

Applies only to instances of type `'array'`.

This attribute indicates that all items in an array instance must be unique (contains no two identical values).

Not supported yet.

### minLength

Applies only to instances of type `'string'`.

Defines the minimum length of the string.

### maxLength

Applies only to instances of type `'string'`.

Defines the maximum length of the string.

### pattern

Applies only to instances of type `'string'`.

A regular expression string.
The instance must match it in order to be valid.

### minimum

Applies only to instances of type `'number'`.

Defines the minimum value of the instance property.

### exclusiveMinimum

Applies only to instances of type `'number'`, and only together with the _minimum_ attribute.

Defines the behavior of the _minimum_ attribute:
* when true, _minimum_ is exclusive ("greater than")
* when false, _minimum_ is inclusive ("greater than or equal")

The default is false.

### maximum

Applies only to instances of type `'number'`.

Defines the maximum value of the instance property.

### exclusiveMaximum

Applies only to instances of type `'number'`, and only together with the _maximum_ attribute.

Defines the behavior of the _maximum_ attribute:
* when true, _maximum_ is exclusive ("less than")
* when false, _maximum_ is inclusive ("less than or equal")

The default is false.

### divisibleBy

Applies only to instances of type `'number'`.

Defines what value the number instance must be divisible by with no remainder.
This value may not be 0.

### format

Not supported yet.

### enum

Not supported yet.

### disallow

Not supported yet.
