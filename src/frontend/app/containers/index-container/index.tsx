/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import './style.scss';

interface IndexContainerProps{}

export default class IndexContainer extends Component<IndexContainerProps, any>{

	render(){
		return (
			<div className="indexContainer">
				<div className="loginBox">
					Captain Hook
				</div>
			</div>
		);
	}

}