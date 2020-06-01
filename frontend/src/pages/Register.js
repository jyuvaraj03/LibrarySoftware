import React, { Component } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			mobile: '',
			password: '',
			confirmPassword: '',
			loading: false,
			message: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateFields = this.validateFields.bind(this);
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	validateFields(obj) {
		// NULL check
		for (const field in obj) {
			if (obj[field].length === 0) {
				this.setState({
					message: `${field} is empty`
				});
				console.log(`${field} is empty`);
				return false;
			}
		}

		// mobile number type check
		if (!/^\d+$/.test(obj.mobile)) {
			this.setState({
				message: 'Mobile number should contain only numbers'
			});
			console.log('Mobile number should contain only numbers');
			return false;
		}

		// mobile number length check
		if (obj.mobile.length !== 10) {
			this.setState({
				message: 'Mobile number should have 10 digits'
			});
			console.log('Mobile number should have 10 digits');
			return false;
		}

		// password length check
		if (obj.password.length < 6) {
			this.setState({
				message: 'Password is too short'
			});
			console.log('Password is too short');
			return false;
		}

		// password match check
		if (obj.password !== obj.confirmPassword) {
			this.setState({
				message: "Passwords don't match"
			})
			console.log("Passwords don't match");
			return false;
		}

		return true;
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			loading: true
		});
		console.log('Submitting form..');

		const formFields = ['name', 'email', 'mobile', 'password', 'confirmPassword'];
		
		// filtering the formFields from this.state
		// https://stackoverflow.com/a/38750895
		const formObject = Object.keys(this.state)
		    .filter(key => formFields.includes(key))
		    .reduce((obj, key) => {
		        obj[key] = this.state[key];
		        return obj;
		    }, {});

		if (!this.validateFields(formObject)) {
			console.log('One of the fields is not right. Aborting submission');
			this.setState({
				loading: false
			});
			return false;
		}

		// removing confirmPassword field before requesting
		const requestObj = Object.assign({}, formObject);
		delete requestObj.confirmPassword;

		axios.post('/api/members/add', requestObj)
			.then(function(response) {
				if (response.data.success) {
					// TODO: 
					// Login automatically and redirect to user page
				}
				console.log(response.data);
				console.log(response.status);
			})
			.catch(function(error) {
				console.log(error.response);
			})
			.finally(function() {
				this.setState({
					loading: false
				});
			})
	}

	render() {
		return (
			<div>
				<Form id='register' onSubmit={this.handleSubmit}>
					<Form.Group>
						<Form.Label>Name</Form.Label>
						<Form.Control name='name' type='text' placeholder='Enter your name' onChange={this.handleChange} required={true} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Email</Form.Label>
						<Form.Control name='email' type='email' placeholder='example@gmail.com' onChange={this.handleChange} required={true} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Mobile Number</Form.Label>
						<Form.Control name='mobile' type='text' placeholder='Enter your 10 digit mobile number' maxLength='10' onChange={this.handleChange} required={true} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Password</Form.Label>
						<Form.Control name='password' type='password' placeholder='Your password' onChange={this.handleChange} required={true} />
						<Form.Text className='text-muted'>Should be at least 6 characters long</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control name='confirmPassword' type='password' placeholder='Confirm your password' onChange={this.handleChange} required={true} />
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