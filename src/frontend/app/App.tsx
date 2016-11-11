import * as React from 'react';
import {Component} from 'react';
import './App.scss';

export interface AppProps{
	children ?: any;
}

class App extends Component<AppProps, any>{
	render(){
		return (
			<div>
				<h1>Captain Hook</h1>
				{this.props.children}
			</div>
			
		);
	}
}

export default App;