
import ReactDOMServer from 'react-dom/server';
import App from './app'
import {StaticRouter, matchPath} from 'react-router-dom'
import routes from './routes'

export const serverRenderMiddleware = (req, res) => {

	const url = req.originalUrl;
	const context = {};

	let loadDataPromise;

	routes.some(route => {
		const match = matchPath(url, route);
		if(!match) return false;

		loadDataPromise = route.loadData ?
			route.loadData(match.params).then(resp => resp.data)
			:
			Promise.resolve({});
		return true;
	});

	if(!loadDataPromise){
		loadDataPromise = Promise.resolve({});
	}

	loadDataPromise.then(loadedData => {

		const content = ReactDOMServer.renderToString(
			<StaticRouter location={url} context={context}>
				<App preLoadedData={loadedData}/>
			</StaticRouter>
		);

		res.send(`
			<!DOCTYPE html>
			<html>
				<head>
					<title>Hello World</title>
				</head>
				<body>
					<div id="react-app">${content}</div>
					<script>
						window.__PRELOADED_DATA__ = ${JSON.stringify(loadedData)}
					</script>
					<script src="/bundle.js"></script>
				</body>
			</html>
		`);

	});
};
