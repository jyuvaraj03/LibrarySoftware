import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route
} from 'react-router-dom';
import Home from './Home';
import Results from './Results';

export default function App() {
	return (
		<Router>
			<Switch>
				<Route path='/results/:endpoint/:searchTerm'>
					<Results />
				</Route>
				<Route path='/'>
					<Home />
				</Route>
			</Switch>
		</Router>
	)	
}