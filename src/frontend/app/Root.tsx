/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import {Provider} from 'react-redux';
import {history, routes, store} from '.';

class Root extends Component<any, any>{
	render(){
		return (
			<Provider store={store} children={routes} />	
		);
	}
}

export default Root;