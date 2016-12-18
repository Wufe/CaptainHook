/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import {CommandLineContainer, EntriesContainer} from '..';
import {DashboardHeader} from '../../components';
import {goto} from '../../';
import './style.scss';

interface IndexContainerProps{}

export default class IndexContainer extends Component<IndexContainerProps, any>{

	componentDidMount(){}

	render(){
		return (
			<div>
				<DashboardHeader />
				<div className="indexContainer">
					<EntriesContainer />
					<CommandLineContainer />
				</div>
			</div>
			
		);
	}

}