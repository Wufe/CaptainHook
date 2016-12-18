/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import {IndexContainer} from '../../containers';
import {goto} from '../../';

interface Props{
	children?: any;
}

interface State{}

export default class Index extends Component<Props, State>{

	render(){
		return (
			<IndexContainer />
		);
	}
}