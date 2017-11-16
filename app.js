var http = require('http');
var express = require('./express');
var router = require('./lib/router');
require('./routes');
var app = express();
var port = process.env.PORT || process.argv[2] || 3000;
var host = 'localhost';

// Delegate the server callback to the router
// var server = http.createServer(router.handle);
//
// server.listen(port, host, () => {
// 	console.log(`Listening: http://${host}:${port}`);
// });

var extractParams = require('./lib/params');

// Use the router to register callbacks
// for paths and HTTP verbs
app.get('/', (req, res) => {
	res.end('Hello routing!');
});

app.get('/foo/:bar/fiz/:baz', (req, res) => {
	res.end(extractParams.reqParams(req));
	//res.end('Hello routing!');
});

app.post('/', (req, res) => {
	var data = req.body;

	// If the content type is JSON
	// parse the data into a JSON string
	if (req.headers['content-type'] === 'application/json') {
		data = JSON.parse(req.body);
		data = JSON.stringify(data, null, 2);
	}

	// Output the POST data
	res.end(`Data: ${data}`);
});

app.listen(port, host, () => {
	console.log(`Listening at http://${host}:${port}`);
});
