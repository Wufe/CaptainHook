/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import './style.scss';

export default class EntriesHeader extends Component<{}, {}>{
	render(){
		return (
			<div className="entriesHeader">
				<div className="buttonGroup">
					<button>Add Entry</button>	
				</div>
			</div>
		);
	}
}