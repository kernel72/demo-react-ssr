import request from 'axios'
import Home from './components/home'
import PageWithData from './components/pageWithData'

export default [{
	path: '/',
	exact: true,
	component: Home
}, {
	path: '/page/:id',
	component: PageWithData,
	loadData: (params) => {
		return request.get(`${API_URL}/data/${params.id}`);
	}
}]
