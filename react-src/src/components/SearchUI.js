import React, { Component } from 'react';
import {
	Input,
	Form,
	Button,
	Radio,
	Icon
} from 'semantic-ui-react';
import './SearchUI.css';

export default class SearchUI extends Component {
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: '',
			option: 'all'
		}
		this.handleChange = this.handleChange.bind(this);
		this.handleOption = this.handleOption.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		this.setState({
			searchTerm: e.target.value
		});
	}

	handleOption(e, {value}) {
		this.setState({
			option: value
		});
	}

	/*handleSubmit(e) {
		e.preventDefault();
		let endpoint = this.state.option;
		let searchTerm = this.state.searchTerm;
		console.log(endpoint, searchTerm);
		if (searchTerm) 
			window.location.href = `results/${endpoint}/${searchTerm}`;

	}*/

	render() {
		return (
			<Form id='searchUI' onSubmit={this.handleSubmit} action={`/results/${this.state.option}/${this.state.searchTerm}`}>
				<Form.Group>
					<Input placeholder='Search' type='text' style={{width: '100%', maxWidth: 600}}>
						<input value={this.state.searchTerm} onChange={this.handleChange} />
					</Input>
				</Form.Group>
				<Form.Group>
						<label>Search By:</label>
						<Form.Field
				            control={Radio}
				            label='All'
				            value='all'
				            checked={this.state.option === 'all'}
				            onChange={this.handleOption}
				        />
				        <Form.Field
				            control={Radio}
				            label='ID'
				            value='id'
				            checked={this.state.option === 'id'}
				            onChange={this.handleOption}
				        />
				        <Form.Field
				            control={Radio}
				            label='Name'
				            value='name'
				            checked={this.state.option === 'name'}
				            onChange={this.handleOption}
				        />
				        <Form.Field
				            control={Radio}
				            label='Author'
				            value='author'
				            checked={this.state.option === 'author'}
				            onChange={this.handleOption}
				        />
				        <Form.Field
				            control={Radio}
				            label='Publisher'
				            value='publisher'
				            checked={this.state.option === 'publisher'}
				            onChange={this.handleOption}
				        />
				        <Form.Field
				            control={Radio}
				            label='Year'
				            value='year'
				            checked={this.state.option === 'year'}
				            onChange={this.handleOption}
				        />
		        </Form.Group>
				<Form.Group>
					<Button icon>Search <Icon name='search' /></Button>
				</Form.Group>
	        </Form>
		)
	}
}