/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import {goto} from '../..';
import './style.scss';

export default class EntriesHeader extends Component<{}, {}>{

	onAddClick( event?: any ){
		goto( '/entry/create' );
	}

	render(){
		return (
			<div className="entriesHeader">
				<div className="buttonGroup">
					<button onClick={this.onAddClick}>Add Entry</button>	
				</div>
			</div>
		);
	}
}