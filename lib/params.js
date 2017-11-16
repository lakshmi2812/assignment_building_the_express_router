var params = {
	reqParams: function(req = { url: '/foo/1/fiz/2' }) {
		const pattern = '/foo/:bar/fiz/:baz';
		const segments = pattern.split('/');

		const segmentsToRegex = segments => {
			let str = '^/';
			for (let i = 0; i < segments.length; i++) {
				let segment = segments[i];
				if (segment[0] === ':') {
					str += '([^\\/]+)';
				} else {
					str += segment;
				}
				str += '/';
				if (i === segments.length - 1) {
					str += '?';
				}
			}
			str += '$';
			const regex = new RegExp(str, 'gi');
			return regex;
		};

		//Parameter Names
		//Return array of parameters in order they appear
		//const pattern = '/foo/:bar/fiz/:baz';
		const paramNames = pattern
			.split('/')
			.filter(segment => segment[0] === ':') //only segments that begin with colon
			.map(name => name.substr(1)); //create a substring starting at first name
		// ['bar','baz']

		//Parameter Values
		//extract from req.url the param values

		const regex = /foo\/([^\/]+)\/fiz\/([^\/])/gi;

		const match = regex.exec(req.url);
		console.log(match);
		//[ 'foo/1/fiz/2', '1', '2', index: 1, input: '/foo/1/fiz/2' ]

		const offset = 1;
		const paramValues = match.slice(offset, paramNames.length + offset);
		console.log(paramValues);
		//[1,2]
		//req.params.bar // 1
		//req.params.baz // 2

		const params = {};
		//loop through param names
		//assign param value to param name in object
		for (let i in paramNames) {
			params[paramNames[i]] = paramValues[i];
		}

		// {
		//      bar: 1,
		//      baz: 2
		// }
		console.log(params);
		return params;
	}
};

params.reqParams();

module.exports = params;

//Testing...

// /^foo$/ match exactly with foo. /^f.o$/

//capture groups
//match regex to registered URL

//take registered URL /user/id
//transform into regex. /user/Capture group for ID. Replace semicolon ID.
