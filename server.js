const express = require('express');

const app = express();

const { serverRenderMiddleware } = require('./dist/server.bundle');
const webpackStats = require('./webpack.stats.json');

app.use(express.static('./dist'));

app.get('/favicon.ico', (req, res) =>  {
	res.sendStatus(204);
});

app.get('/api/data/:id', (req, res) => {
	res.json(`Data for ${req.params.id}`);
});

app.use('*',
	serverRenderMiddleware(webpackStats.children[0])
);

app.listen('3000', () => {
	console.log('Listening on 3000');
});
