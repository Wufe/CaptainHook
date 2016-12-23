/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {Routing, PATH_INDEX, PATH_ENTRY_CREATE} from '../..';
import {State} from '../../states';
import {CommandLineContainer} from '..';
import {Entries, EntriesHeader, Modal} from '../../components';

type Props = {
	routing: Routing;
}

class EntriesContainer extends Component<Props, {}>{
	render(){
		const {pathname: path} = this.props.routing;
		const FULL_PATH_ENTRY_CREATE = `${PATH_INDEX}${PATH_ENTRY_CREATE}`;
		const display = path == FULL_PATH_ENTRY_CREATE;
		return (
			<div>
				<EntriesHeader />
				<Modal display={display}>
					<h1>Modal</h1>
				</Modal>
				<Entries />	
			</div>
		);
	}
}

const mapStateToProps = ( state: State ) => {
	const {locationBeforeTransitions: routing} = state.routing;
	return {
		routing
	}
};

export default connect( mapStateToProps, null )( EntriesContainer );