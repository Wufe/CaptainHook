/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';

interface Props{
	children?: any;
}

interface State{}

export default class Home extends Component<Props, State>{
	render(){
		return (
			<div>
				Home route
			</div>
		);
	}
}