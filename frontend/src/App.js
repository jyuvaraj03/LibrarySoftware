import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import withAuth from './withAuth';
import Home from './Home';
import Results from './Results';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import AddBook from './pages/AddBook';
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
				<Route path='/results/:endpoint/:searchTerm' component={Results} />
				<Route path='/books/add' component={AddBook} />
				<Route path='/books' component={Books} />
				<Route path='/profile' component={withAuth(Profile)} />
				<Route path='/register' component={Register} />
				<Route path='/login' component={Login} />
				<Route path='/' component={Home} />
			</Switch>
		</Router>
	)	
}