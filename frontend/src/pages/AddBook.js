import React, { Component } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

export default class AddBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			author: '',
			publisher: '',
			year: '',
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
		// Title NULL check
		if (obj.name.length === 0) {
			this.setState({
				message: `Title should not be empty`
			});
			console.log(`Title should not be empty`);
			return false;
		}
		return true
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			loading: true
		});
		console.log('Adding book..');

		const { name, author, publisher, year } = this.state;

		const requestObj = {
			name,
			author,
			publisher,
			year
		};

		if (!this.validateFields(requestObj)) {
			console.log('Form data is not valid');
			this.setState({
				loading: false
			});
			return false;
		}

		axios.post('/api/books/add', requestObj)
			.then(response => {
				if (response.data.success) {
					this.setState({
						message: `Added book with id: ${response.data.id}`
					});
				}
			})
			.catch(error => {
				this.setState({
					message: 'An error occured. Please try again.'
				});
				console.log(error.response);
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
				{this.state.message && <h5>{this.state.message}</h5>}
				<Form id='add-book' onSubmit={this.handleSubmit}>
					<Form.Group>
						<Form.Label>Title</Form.Label>
						<Form.Control name='name' type='text' placeholder="Title" onChange={this.handleChange} required={true} />
						<Form.Text className='text-muted'>This field is required</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Label>Author</Form.Label>
						<Form.Control name='author' type='text' placeholder="Author" onChange={this.handleChange} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Publisher</Form.Label>
						<Form.Control name='publisher' type='text' placeholder="Publisher" onChange={this.handleChange} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Year</Form.Label>
						<Form.Control name='year' type='text' placeholder="Year" onChange={this.handleChange} maxLength='4' />
					</Form.Group>
					<Button type='submit'>
						Add Book
						{' '}
						{this.state.loading && <Spinner animation='border' as='span' size='sm' />}
					</Button>
				</Form>
			</div>
		);
	}
}