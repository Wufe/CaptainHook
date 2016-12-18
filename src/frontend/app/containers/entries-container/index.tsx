/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import {CommandLineContainer} from '..';
import {Entries, EntriesHeader} from '../../components';

export default class EntriesContainer extends Component<{}, {}>{
	render(){
		return (
			<div>
				<EntriesHeader />
				<Entries />	
			</div>
		);
	}
}