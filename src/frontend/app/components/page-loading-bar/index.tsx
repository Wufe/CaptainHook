/// <reference path="../../../../../typings/index.d.ts" />

import * as React from 'react';
import {Component} from 'react';
import {connect} from 'react-redux';
import {setPageLoading, setPageLoaded} from '../../actions/app';
import {App as AppState} from '../../states';
import './style.scss';

interface ComponentProps{
	children ?: any;
}

interface StateProps{
	app?: AppState;
}

type Props = ComponentProps & StateProps;

class PageLoadingBar extends Component<Props, {}>{
	render(){
		return (
			<div
				className='pageLoadingBar'
				style={{opacity: this.props.app.loading ? 1 : 0}}>
				<div className="loadingBar">
                </div>
			</div>
		);
	}
}

let mapStateToProps: ( state: any ) => any =
	( state ) => {
		return {
			app: state.app
		};
	};

export default connect( mapStateToProps, null )( PageLoadingBar );