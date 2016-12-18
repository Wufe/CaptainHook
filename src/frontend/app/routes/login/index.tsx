/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import {LoginContainer} from '../../containers';

interface Props{
	children?: any;
}

interface State{}

export default class Login extends Component<Props, State>{

	render(){
		return (
			<LoginContainer />
		);
	}

}