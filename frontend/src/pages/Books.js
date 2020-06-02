import React, { Component } from 'react';
import SearchUI from '../components/SearchUI';
import { Table } from 'react-bootstrap';
import axios from 'axios';

export default class Books extends Component {
	constructor(props) {
		super(props);
		this.state = {
			books: [],
			loading: false,
			booksPerPage: 20,
			currPage: 0,
			pagesFetched: 0
		}
		this.fetchBooks = this.fetchBooks.bind(this);
	}

	// fetches `limit` rows starting from `offset` row
	fetchBooks(offset, limit) {
		this.setState({
			loading: true
		});
		// console
		axios.get('/api/books/list', {
			params: {
				offset: offset,
				limit: limit
			}
		})
			.then(res => {
				if (res.data && res.data.books) {
					this.setState(state => ({
						books: [...state.books, ...res.data.books],
						pagesFetched: state.pagesFetched + 1
					}));
				}
			})
			.catch(err => {
				console.log('error in fetching books');
			})
			.finally(() => {
				this.setState({
					loading: false
				})
			});
	}

	componentDidMount() {
		this.fetchBooks(0, this.state.booksPerPage);

		/*const booksPerPage = this.state.booksPerPage;
		if (this.state.currPage >= this.state.pagesFetched)
			this.fetchBooks(this.state.currPage * booksPerPage, booksPerPage);*/
	}

	render() {
		const booksIndexStart = this.state.currPage * this.state.booksPerPage;
		const booksIndexEnd = booksIndexStart + this.state.booksPerPage;
		const raw = this.state.books.slice(booksIndexStart, booksIndexEnd);
		const tableRows = raw.map((book => (
			<tr key={book.id}>
				<td>{book.id}</td>
				<td>{book.name}</td>
				<td>{book.author}</td>
				<td>{book.publisher}</td>
				<td>{book.year}</td>
			</tr>
		)));
		return (
			<div id='books'>
				<SearchUI />
				<hr />
				<div>
					<Table striped bordered>
						<thead>
							<tr>
								<th>ID</th>
								<th>Title</th>
								<th>Author</th>
								<th>Publisher</th>
								<th>Year</th>
							</tr>
						</thead>
						<tbody>
							{tableRows}
						</tbody>
					</Table>
				</div>
			</div>
		)
	}
}