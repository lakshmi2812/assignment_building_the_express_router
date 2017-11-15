function requestParams(userUrl = '/foo/3/fiz/4') {
	// regex
	// segments
	// param names

	// const url = 'foo/1/fiz/2';
	// const urlSegments = url.split('/');
	const userUrlSegments = userUrl.split('/');
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

	const extractParamNames =  => {
		//extract user parameter values from url
		let obj = {};
		let regexArr =
    let regex = segmentsToRegex(segments);
    let matchArr = userUrlString.match(regex);
		for (let i = 0; i < matchArr.length; i++) {
			if (matchArr[i] === 'foo') {
				obj['foo'] = matchArr[i + 1];
			} else if (matchArr[i] === 'fiz') {
				obj['fiz'] = matchArr[i + 1];
			}
		}
		return obj;
	};

	return extractParamNames(userUrlSegments);
}

//Testing...

// console.log(requestParams());
//
// const url = 'foo/1/fiz/2';
// const url_segments = url.split('/');
// console.log(segmentsToRegex(url_segments)); // returns this --> ^/foo/1/fiz/2/?$
// let matchArr = segmentsToRegex(url_segments).split('/');
// let obj = {};
// for (var i = 0; i < matchArr.length; i++) {
// 	if (matchArr[i] === 'foo') {
// 		obj['foo'] = matchArr[i + 1];
// 	} else if (matchArr[i] === 'fiz') {
// 		obj['fiz'] = matchArr[i + 1];
// 	}
// }
// console.log(obj);
//construct capture groups to get URL

// /^foo$/ match exactly with foo. /^f.o$/

//capture groups
//match regex to registered URL

//take registered URL /user/id
//transform into regex. /user/Capture group for ID. Replace semicolon ID.
