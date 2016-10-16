import * as React from 'react';
import './App.scss';

export interface AppProps{
	children ?: any;
}

class App extends React.Component<AppProps, any>{
	render(){
		return (
			<h1>Captain Hook</h1>
		);
	}
}

export default App;