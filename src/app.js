
import {Switch, Route, Link} from 'react-router-dom'
import routes from './routes'

export default class App extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			isFirstLoad: true
		}
	}

	onFirstLoad(){
		this.setState({
			isFirstLoad: false
		});
	}

	render(){
		const {isFirstLoad} = this.state;
		const {preLoadedData} = this.props;

		return (
			<div>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/page/data1">Page with data1</Link></li>
					<li><Link to="/page/data2">Page with data2</Link></li>
				</ul>

				<hr/>

				<Switch>
					{
						routes.map(route => {
							const {exact, path} = route;

							return (
								<Route key={path} exact={exact} path={path} render={
									props => (
										<LoadRoute preLoadedData={isFirstLoad && preLoadedData}
										          onFirstLoad={this.onFirstLoad.bind(this)}
										          isFirstLoad={isFirstLoad}
										           route={route}
										           {...props}/>
									)
								}/>
							)
						})
					}
				</Switch>
			</div>
		)
	}
}

class LoadRoute extends React.Component {
	constructor(props) {
		super(props);

		const {isFirstLoad, preLoadedData} = props;

		this.state = {
			isDataLoaded: isFirstLoad || false,
			pageData: isFirstLoad ? (preLoadedData || {}) : {}
		};
	}

	componentDidMount() {
		const {isFirstLoad, onFirstLoad} = this.props;
		isFirstLoad && onFirstLoad();
		if(!isFirstLoad){
			this.loadPageData();
		}
	}

	componentDidUpdate(prevProps){
		const {location: {pathname: currentUrl}} = this.props;
		const {location: {pathname: prevUrl}} = prevProps;

		if(currentUrl !== prevUrl){
			this.loadPageData();
		}
	}

	loadPageData(){

		const {match, route} = this.props;

		this.setState({
			pageData: {},
			isDataLoaded: !route.loadData
		});

		if(route.loadData){
			route.loadData(match.params).then(response => {
				this.setState({
					isDataLoaded: true,
					pageData: response.data || {}
				});
			});
		}
	}


	render(){

		const {isDataLoaded, pageData} = this.state;
		const {route, match} = this.props;

		const Component = route.component;

		return (
			<Loading isInProgress={!isDataLoaded}>
				<Component pageData={pageData} match={match}/>
			</Loading>
		)
	}

}

const Loading = ({isLoading, children}) => {
	return isLoading ?  <div>Loading...</div> : children;
};







