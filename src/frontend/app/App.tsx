/// <reference path="../../../typings/index.d.ts" />

import * as React from 'react';
import './App.scss';
import {actions} from './actions';
import {App as AppState} from './states';
import {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {PageLoadingBar} from './components';
import {setPageLoading, setPageLoaded} from './actions/app';
import {store} from './StoreProvider';

export interface AppProps{
	children ?: any;
	setPageLoading?: any;
	setPageLoaded?: any;
}

class App extends Component<AppProps, any>{

	componentDidMount(){
		setTimeout( () => {
			this.props.setPageLoading();
		}, 1000 );
		setTimeout( () => {
			this.props.setPageLoaded();
		}, 4000 );
	}

	render(){
		return (
			<div>
				<PageLoadingBar />
				<h1>Captain Hook</h1>
				{this.props.children}
			</div>
			
		);
	}
}

let mapDispatchToProps: ( dispatch: Dispatch<AppState> ) => any =
	( dispatch ) => {
		return {
			setPageLoading: () => dispatch( setPageLoading() ),
			setPageLoaded: () => dispatch( setPageLoaded() )
		};
	};

export default connect( null, mapDispatchToProps )( App );