# What's jsonly?

_jsonly_ validates JSON objects against a JSON schema.
In other words, it makes sure an object conforms to the type and structure that your code expects.
For example, a server can use it to ensure input from a client conforms to the API.
The JSON schema can also help with documentation and collaboration. Copy it to the API document and everybody will understand exactly what is expected.

# What is a JSON schema?

[JSON Schema](http://json-schema.org/) is a proposed Internet draft defining a JSON media type (application/schema+json) with the following goals:
* Validation - You can use JSON Schema to validate your JSON data.
* Documentation - You can extract documentation information from a JSON Schema, match this documentation to your data, and use that information for user interaction.
* Hyperlinking - You can pair your JSON data with the defining JSON Schema to build hyperlinks into parts of that JSON data.
_jsonly_ supports most of [JSON Schema Draft 3](http://tools.ietf.org/html/draft-zyp-json-schema-03), without the hyperlinking part.

## Example

    var schema = {
    	type: 'object',
    	properties: {
    		query: {
    			type: 'string',
    			description: 'Query string',
    			maxLength: 32,
    			required: true
    		},
    		maxResults: {
    			type: 'integer',
    			maximum: 20,
    			default: 10
    		}
    	}
    };

    output = jsonly(input, schema);
    if (output instanceof Error) {
    	return res.send(400, output.message); // 400 Bad Request
    }

## Installation

    $ npm install jsonly




