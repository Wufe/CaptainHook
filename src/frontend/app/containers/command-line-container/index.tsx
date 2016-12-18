/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import {CommandLine} from '../../components';

export default class CommandLineContainer extends Component<{}, {}>{
	render(){
		return (
			<CommandLine />
		);
	}
}