import * as React from 'react';

export interface AppProps{
	children ?: any;
}

class App extends React.Component<AppProps, any>{
	render(){
		return (
			<h1>Hello world</h1>
		);
	}
}

export default App;