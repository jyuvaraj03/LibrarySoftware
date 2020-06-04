import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import withUser from './withUser';
import withAdmin from './withAdmin';
import Home from './Home';
import Results from './Results';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import Books from './pages/Books'

export default function App() {
	return (
		<Router>
			<link
			  rel="stylesheet"
			  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
			  integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
			  crossOrigin="anonymous"
			/>
			<Switch>
				<Route exact path='/results/:endpoint/:searchTerm' component={Results} />
				<Route exact path='/books/add' component={AddBook} />
				<Route exact path='/books/:id/edit' component={withAdmin(EditBook)} />
				<Route exact path='/books' component={Books} />
				<Route exact path='/profile' component={withUser(Profile)} />
				<Route exact path='/register' component={Register} />
				<Route exact path='/login' component={Login} />
				<Route exact path='/' component={Home} />
			</Switch>
		</Router>
	)	
}