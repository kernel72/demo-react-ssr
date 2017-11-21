import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import App from './app'

const preloadedData = window.__PRELOADED_DATA__ || {};
delete window.__PRELOADED_DATA__;

ReactDOM.hydrate(
	<BrowserRouter>
		<App preLoadedData={preloadedData}/>
	</BrowserRouter>,
	document.getElementById('react-app')
);
