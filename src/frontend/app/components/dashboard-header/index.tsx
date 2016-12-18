/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import './style.scss';

export default class DashboardHeader extends Component<{}, {}>{
	render(){
		return (
			<div className="dashboardHeader">
				<div className="centeredHeader">
					<div className="inline verticalBar"></div>
					<div className="inline brand">Captain Hook</div>
				</div>
			</div>
		);
	}
}