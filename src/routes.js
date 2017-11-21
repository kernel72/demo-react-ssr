import request from 'axios'

export default [{
	path: '/',
	exact: true,
	loadComponent: () => import('./components/home')
}, {
	path: '/page/:id',
	loadComponent: () => import('./components/pageWithData'),
	loadData: (params) => {
		return request.get(`${API_URL}/data/${params.id}`);
	}
}]
