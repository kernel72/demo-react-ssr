
import ReactDOMServer from 'react-dom/server';
import App from './app'
import {StaticRouter} from 'react-router-dom'

export const html = (url, context) => {

	const content = ReactDOMServer.renderToString(
		<StaticRouter location={url} context={context}>
			<App/>
		</StaticRouter>
	);

	return `
		<!DOCTYPE html>
		<html>
			<head>
				<title>Hello World</title>
			</head>
			<body>
				<div id="react-app">${content}</div>
				<script src="/bundle.js"></script>
			</body>
		</html>
	`
};
