const express = require('express');

const app = express();

const {html} = require('./dist/server.bundle');

app.use(express.static('./dist'));

app.get('/favicon.ico', (req, res) =>  {
	res.sendStatus(204);
});

app.get('/api/data/:id', (req, res) => {
	res.json(`Data for ${req.params.id}`);
});

app.use('*', (req, res) => {
	res.send(html(req.originalUrl, {}));
});

app.listen('3000', () => {
	console.log('Listening on 3000');
});
