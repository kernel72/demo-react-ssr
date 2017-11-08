const express = require('express');

const app = express();

app.use(express.static('./dist'));

app.get('/favicon.ico', (req, res) =>  {
	res.sendStatus(204);
});

app.get('/api/data/:id', (req, res) => {
	res.json(`Data for ${req.params.id}`);
});

app.use('*', (req, res) => {
	res.send(
		`
			<DOCTYPE html>
			<html>
				<head>
					<title>Hello World</title>
				</head>
				<body>
					<div id="react-app"></div>
					<script src="/bundle.js"></script>
				</body>
			</html>
		`
	)
});

app.listen('3000', () => {
	console.log('Listening on 3000');
});
