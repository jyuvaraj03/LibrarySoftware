import React, { Component } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

export default class AddBook extends Component {
	constructor(props) {
		super(props);
		this.state = {
			bookId: this.props.match.params.id,
			name: '',
			author: '',
			publisher: '',
			year: '',
			loading: true,
			message: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.validateFields = this.validateFields.bind(this);
		this.fetchBookDetails = this.fetchBookDetails.bind(this);
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

	fetchBookDetails() {
		const bookId = this.state.bookId;
		console.log('fetching book details for ', bookId);
		if (!bookId) {
			return;
		}
		axios.get(`/api/books/${bookId}`)
			.then(res => {
				if (!res.data || !res.data.book) {
					return;
				}
				const { name, author, publisher, year } = res.data.book;
				this.setState({
					name,
					author,
					publisher,
					year,
					loading: false
				});
				console.log(this.state);
			})
			.catch(err => {
				console.log(err);
			});
	}

	handleSubmit(e) {
		e.preventDefault();
		this.setState({
			loading: true
		});
		console.log('Editing book..');

		const { bookId, name, author, publisher, year } = this.state;

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

		axios.patch(`/api/books/${bookId}`, requestObj)
			.then(res => {
				if (res.status === 200 && res.data && res.data.success) {
					this.setState({
						message: `Edited book details.`
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

	componentDidMount() {
		this.fetchBookDetails();
	}

	render() {
		return (
			<div>
				{this.state.message && <h5>{this.state.message}</h5>}
				<Form id='add-book' onSubmit={this.handleSubmit}>
					<Form.Group>
						<Form.Label>Title</Form.Label>
						<Form.Control value={this.state.name} name='name' type='text' placeholder="Title" onChange={this.handleChange} required={true} />
						<Form.Text className='text-muted'>This field is required</Form.Text>
					</Form.Group>
					<Form.Group>
						<Form.Label>Author</Form.Label>
						<Form.Control value={this.state.author} name='author' type='text' placeholder="Author" onChange={this.handleChange} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Publisher</Form.Label>
						<Form.Control value={this.state.publisher} name='publisher' type='text' placeholder="Publisher" onChange={this.handleChange} />
					</Form.Group>
					<Form.Group>
						<Form.Label>Year</Form.Label>
						<Form.Control value={this.state.year} name='year' type='text' placeholder="Year" onChange={this.handleChange} maxLength='4' />
					</Form.Group>
					<Button type='submit'>
						Edit Book
						{' '}
						{this.state.loading && <Spinner animation='border' as='span' size='sm' />}
					</Button>
				</Form>
			</div>
		);
	}
}