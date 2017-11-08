
import {Switch, Route, Link} from 'react-router-dom'
// import request from 'superagent'
import {Helmet} from 'react-helmet'

export default class App extends React.Component {
	render(){
		return (
			<div>
				<ul>
					<li><Link to="/">Home</Link></li>
					<li><Link to="/page/data1">Page with data1</Link></li>
					<li><Link to="/page/data2">Page with data2</Link></li>
				</ul>

				<hr/>
				<Switch>
					<Route exact path="/" component={HomePage}/>
					<Route path="/page/:id" component={PageWithData}/>
				</Switch>
			</div>
		)
	}
}

const HomePage = () => (
	<div>
		<Helmet>
			<title>Hello from home page</title>
		</Helmet>
		Home Page
	</div>
);

class PageWithData extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loadingData: false,
			data: null
		}
	}

	// loadData(props){
	// 	this.setState({
	// 		loadingData: true
	// 	});
	// 	const {match} = props;
	// 	request(`/api/data/${match.params.id}`)
	// 		.then(resp => this.setState({
	// 			loadingData: false,
	// 			data: resp.body
	// 		}));
	// }
	//
	// componentDidMount(){
	// 	this.loadData(this.props)
	// }
	//
	// componentWillReceiveProps(props){
	// 	this.loadData(props);
	// }

	render(){
		// const {loadingData, data} = this.state;
		const {match: {params: {id}}} = this.props;
		return (
			<div>
				<Helmet>
					<title>{id} Page</title>
				</Helmet>
				Data Loaded: {id}
			</div>
		)

		// return(
		// 	<div>
		// 		<Helmet>
		// 			<title>{id} Page</title>
		// 		</Helmet>
		// 		{loadingData ? "Loading..." : `Data Loaded: ${data}`}
		// 	</div>
		// )
	}
}



