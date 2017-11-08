
import ReactDOM from 'react-dom'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import request from 'superagent'

class App extends React.Component {
	render(){
		return (
			<BrowserRouter>
				<div>
					<ul>
						<li><Link to="/">Home</Link></li>
						<li><Link to="/page/data1">Page with data1</Link></li>
						<li><Link to="/page/data2">Page with data2</Link></li>
					</ul>

					<hr/>
					<Route exact path="/" component={HomePage}/>
					<Route path="/page/:id" component={PageWithData}/>
				</div>
			</BrowserRouter>
		)
	}
}

const HomePage = () => (
	<div>Home Page</div>
);

class PageWithData extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loadingData: false,
			data: null
		}
	}

	loadData(props){
		this.setState({
			loadingData: true
		});
		const {match} = props;
		request(`/api/data/${match.params.id}`)
			.then(resp => this.setState({
				loadingData: false,
				data: resp.body
			}));
	}

	componentDidMount(){
		this.loadData(this.props)
	}

	componentWillReceiveProps(props){
		this.loadData(props);
	}

	render(){
		const {loadingData, data} = this.state;
		return(
			loadingData ? "Loading..." : `Data Loaded: ${data}`
		)
	}
}

ReactDOM.render(
	<App/>,
	document.getElementById('react-app')
);

