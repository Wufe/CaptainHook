/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../../typings/react-particles-js/index.d.ts" />

import * as React from 'react';
import './style.scss';
import {actions} from '../../actions';
import {App as AppState} from '../../states';
import {Component} from 'react';
import {connect} from 'react-redux';
import {} from 'history';
import {Dispatch} from 'redux';
import {NotificationContainer} from '../../containers';
import {PageLoadingBar} from '..';
import {ping, setPageLoading, setPageLoaded} from '../../actions/app';
import {store, goto} from '../../';

export interface AppProps{
	children ?: any;
	ping?: any;
	setPageLoading?: any;
	setPageLoaded?: any;
}

export interface StateProps{
	app: AppState,
	routing: {
		pathname?: string;
		search?: string;
		query?: { [key: string]: any; };
		state?: Object;
		action?: string;
		key?: string;
		hash?: string;
		basename?: string;
	}
}

export type Props = AppProps & StateProps;

class Structure extends Component<Props, any>{

	constructor( props: Props ){
		super( props );
		this.checkAuth = this.checkAuth.bind( this );
	}

	checkAuth(): void{
		if( this.props.routing.pathname != "/login" &&
			!this.props.app.auth.logged ){
			goto( "/login" );
		}
	}

	componentWillMount(){
		//this.checkAuth();
		// setInterval( () => {
		// 	this.props.ping();
		// }, 6000 );
		// setTimeout( () => {
		// 	this.props.setPageLoading();
		// }, 1000 );
		// setTimeout( () => {
		// 	this.props.setPageLoaded();
		// }, 4000 );
	}

	render(){
		return (
			<div>
				<PageLoadingBar />
				<NotificationContainer />
				<div className="structureContainer">
					{this.props.children}
				</div>
				
			</div>
			
		);
	}
}

let mapStateToProps: ( state: any ) => any =
	( state ) => {
		let {app, routing} = state;
		return {app, routing: routing.locationBeforeTransitions};
	};

let mapDispatchToProps: ( dispatch: Dispatch<AppState> ) => any =
	( dispatch ) => {
		return {
			setPageLoading: () => dispatch( setPageLoading() ),
			setPageLoaded: () => dispatch( setPageLoaded() ),
			ping: () => dispatch( ping() )
		};
	};

export default connect( mapStateToProps, mapDispatchToProps )( Structure );