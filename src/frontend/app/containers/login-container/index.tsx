/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import Particles from 'react-particles-js';
import {Login} from '../../components';

export default class LoginContainer extends Component<{}, {}>{

	render(){
		return <Login />;
	}

}