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
					<div className="header">
						Captain Hook
					</div>
					<div className="subheader">
						Login
					</div>
					<input type="text" placeholder="Username" />
						<br />
					<input type="password" placeholder="Password" />
				</div>
			</div>
		);
	}

}