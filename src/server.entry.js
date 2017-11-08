
import ReactDOMServer from 'react-dom/server';
import App from './app'

export const html = () => {

	const content = ReactDOMServer.renderToString(<App/>);

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
