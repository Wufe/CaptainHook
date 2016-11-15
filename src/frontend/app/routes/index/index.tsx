/// <reference path="../../../../../typings/globals/react/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';

interface Props{
	children?: any;
}

interface State{}

export default class Index extends Component<Props, State>{
	render(){
		return (
			<div>
				<h2>Main Route [Index]</h2>
			</div>
		);
	}
}