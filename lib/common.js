exports.getType = function (obj) {
	switch (Object.prototype.toString.call(obj)) {
		case '[object String]':
			return 'string';
		case '[object Number]':
			return (obj % 1 === 0) ? 'integer' : 'number';
		case '[object Boolean]':
			return 'boolean';
		case '[object Object]':
			return 'object';
		case '[object Array]':
			return 'array';
		case '[object Null]':
			return 'null';
		default:
			return undefined;
	}
}

exports.withAOrAn = function (s) {
	var beginsWithVowel = s[0] == 'a' || s[0] == 'e' || s[0] == 'i' || s[0] == 'o' || s[0] == 'u';
	return (beginsWithVowel ? 'an ' : 'a ') + s;
}

exports.isOfType = function (obj, type) {
	switch (type) {
		case 'string':
		case 'number':
		case 'boolean':
		case 'object':
		case 'array':
		case 'null':
			type = type.charAt(0).toUpperCase() + type.slice(1);
			return Object.prototype.toString.call(obj) === '[object ' + type + ']';
		case 'integer':
			return Object.prototype.toString.call(obj) === '[object Number]' && obj % 1 === 0;
		case 'any':
		default:
			return true;
	}
}

exports.getName = function (names) {
	return names.length === 0 ? '' : ' property \'' + names.join('.') + '\'';
}
