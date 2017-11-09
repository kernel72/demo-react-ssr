
import ReactDOMServer from 'react-dom/server';
import App from './app'
import {StaticRouter, matchPath} from 'react-router-dom'
import routes from './routes'
import {Helmet} from 'react-helmet'
import { flushChunkNames } from 'react-universal-component/server'
import flushChunks from 'webpack-flush-chunks'

export const serverRenderMiddleware = (webpackStats) => (req, res) => {

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

		const helmet = Helmet.renderStatic();

		const {
			js,
			cssHash
		} = flushChunks(webpackStats, { chunkNames: flushChunkNames() });

		res.send(`
			<!DOCTYPE html>
			<html ${helmet.htmlAttributes.toString()}>
		        <head>
		        	<base href="/">
		            ${helmet.title.toString()}
		            ${helmet.meta.toString()}
		            ${helmet.link.toString()}
		        </head>
				<body ${helmet.bodyAttributes.toString()}>
					<div id="react-app">${content}</div>
					<script>
						window.__PRELOADED_DATA__ = ${JSON.stringify(loadedData)}
					</script>
					${cssHash}
                	${js}
				</body>
			</html>
		`);
	});
};
