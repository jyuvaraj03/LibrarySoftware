import React, { Component } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

export default class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			loading: false,
			member: {}
		}
		this.fetchDetails = this.fetchDetails.bind(this);
	}

	fetchDetails() {
		console.log(`Requesting from api`);
		axios.get(`/api/members/profile`)
			.then((res) => {
				this.setState({
					loading: false,
					member: res.data.member
				});
				console.log('datatatata',res.data);
			})
			.catch((err) => {
				console.log('err', err);
			});
	}

	componentDidMount() {
		this.fetchDetails();
	}

	render() {
		const tableRows = Object.entries(this.state.member).map(row => (
			<tr>
				<td>{row[0]}</td>
				<td>{row[1]}</td>
			</tr>
		));			
		return (
			<Table>
				<tbody>
					{tableRows}
				</tbody>
			</Table>
		)
	}
}
