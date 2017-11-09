import {Helmet} from 'react-helmet'

const PageWithData = ({pageData, match}) => {
	const {params: {id}} = match;
	return (
		<div>
			<Helmet>
				<title>{id} Page</title>
			</Helmet>
			Data Loaded: {JSON.stringify(pageData)}
		</div>
	)
};

export default PageWithData;
