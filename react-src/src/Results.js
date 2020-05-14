import React, { Component } from 'react';
import SearchUI from './components/SearchUI';
import { Segment, Dimmer, Loader, Table } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Results extends Component {
	constructor(props) {
		super(props);
		this.state = {
			results: [],
			loading: true
		}
		this.fetchResults = this.fetchResults.bind(this);
	}

	fetchResults(endpoint, searchTerm) {
		console.log(`Requesting from /api/${endpoint}/${searchTerm}`);
		axios.get(`/api/${endpoint}/${searchTerm}`)
			.then((res) => {
				// setResults(res.data);
				this.setState({
					results: res.data,
					loading: false
				});
				console.log('lol',res.data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	}

	componentDidMount() {
		const endpoint = this.props.match.params.endpoint;
		const searchTerm = this.props.match.params.searchTerm;
		this.fetchResults(endpoint, searchTerm);
	}

	render() {
		const resultTableRows = this.state.results.map(row => (
			<Table.Row key={row.id}>
				<Table.Cell>{row.id}</Table.Cell>
		        <Table.Cell>{row.name}</Table.Cell>
		        <Table.Cell>{row.author}</Table.Cell>
		        <Table.Cell>{row.publisher}</Table.Cell>
		        <Table.Cell>{row.year}</Table.Cell>
		    </Table.Row>
		));			
		return (
			<div className='Results'>
				<SearchUI />
				<hr />
				<Segment style={{minHeight: 100}}>
					<Dimmer inverted active={this.state.loading}>
						<Loader content='Loading..' />
					</Dimmer>
					<Table celled>
					    <Table.Header>
					      <Table.Row>
					        <Table.HeaderCell>ID</Table.HeaderCell>
					        <Table.HeaderCell>Title</Table.HeaderCell>
					        <Table.HeaderCell>Author</Table.HeaderCell>
					        <Table.HeaderCell>Publisher</Table.HeaderCell>
					        <Table.HeaderCell>Year</Table.HeaderCell>
					      </Table.Row>
					    </Table.Header>

					    <Table.Body>
					    	{resultTableRows}
					    </Table.Body>
					</Table>
				</Segment>
			</div>
		)
	}
}

export default withRouter(Results);
