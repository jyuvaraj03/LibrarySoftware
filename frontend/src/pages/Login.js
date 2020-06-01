import React, { Component } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			loading: false,
			message: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			loading: true
		});
		console.log('Submitting form..');

		const requestFields = ['email', 'password'];
		
		// filtering the requestFields from this.state
		// https://stackoverflow.com/a/38750895
		const requestObj = Object.keys(this.state)
		    .filter(key => requestFields.includes(key))
		    .reduce((obj, key) => {
		        obj[key] = this.state[key];
		        return obj;
		    }, {});

		axios.post('/api/members/authenticate', requestObj)
			.then(response => {
				console.log(response);
				if (response.status === 200) {
					// TODO: 
					// Login automatically and redirect to user page
					this.props.history.push('/profile');
				}
			})
			.catch(error => {
				console.log(error.response);
				if (error.response && error.response.data) {
					this.setState({
						message: error.response.data.msg
					});
				}
			})
			.finally(() => {
				this.setState({
					loading: false
				});
			});
	}

	render() {
		return (
			<div>
				<Form id='login' onSubmit={this.handleSubmit}>
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control name='email' type='email' placeholder='example@email.com' onChange={this.handleChange} required={true} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control name='password' type='password' placeholder='Your password' onChange={this.handleChange} required={true} />
					</Form.Group>
					<Button type='submit'>
						Submit
						{' '}
						{this.state.loading && <Spinner animation='border' as='span' size='sm' />}
					</Button>
				</Form>
			</div>
		);
	}
}