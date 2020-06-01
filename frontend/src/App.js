import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import Home from './Home';
import Results from './Results';
import Register from './pages/Register';

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
				<Route path='/results/:endpoint/:searchTerm'>
					<Results />
				</Route>
				<Route path='/register'>
					<Register />
				</Route>
				<Route path='/'>
					<Home />
				</Route>
			</Switch>
		</Router>
	)	
}