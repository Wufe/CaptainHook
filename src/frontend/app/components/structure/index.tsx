/// <reference path="../../../../../typings/index.d.ts" />
/// <reference path="../../../../typings/react-particles-js/index.d.ts" />

import * as React from 'react';
import './style.scss';
import {actions} from '../../actions';
import {App as AppState} from '../../states';
import {Component} from 'react';
import {connect} from 'react-redux';
import {Dispatch} from 'redux';
import {NotificationContainer} from '../../containers';
import {PageLoadingBar} from '..';
import {ping, setPageLoading, setPageLoaded} from '../../actions/app';
import {store, goto} from '../../';

import {Particles} from 'react-particles-js';

export interface AppProps{
	children ?: any;
	ping?: any;
	setPageLoading?: any;
	setPageLoaded?: any;
}

class Structure extends Component<AppProps, any>{

	componentDidMount(){
		setInterval( () => {
			this.props.ping();
		}, 60000 );
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
				<NotificationContainer />
				<div className="structureContainer">
					<div className="particlesContainer">
						<Particles params={{
							particles: {
								number:{
									value: 20
								},
								line_linked: {
									color: "#1e95e9",
									shadow: {
										enable: true,
										blur: 15,
										color: 'white'
									}
								},
								move: {
									speed: 1
								}
							}
						}}
						style={{
							position: 'absolute',
							left: 0,
							top: 0,
							zIndex: 0
						}}
						width="100%"
						height="100%" />
					</div>
					{this.props.children}
				</div>
				
			</div>
			
		);
	}
}

let mapDispatchToProps: ( dispatch: Dispatch<AppState> ) => any =
	( dispatch ) => {
		return {
			setPageLoading: () => dispatch( setPageLoading() ),
			setPageLoaded: () => dispatch( setPageLoaded() ),
			ping: () => dispatch( ping() )
		};
	};

export default connect( null, mapDispatchToProps )( Structure );