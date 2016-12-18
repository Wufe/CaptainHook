/// <reference path="../../../../typings/index.d.ts" />

import {ReactType} from 'react';
import {RouterState} from 'react-router';
import {store} from '../StoreProvider';
import {setPageLoading, setPageLoaded} from '../actions/app';

let moduleRequest: ( module: any ) => void;

const loader: ( route: string ) => 
	( nextState: RouterState, callback: ( error: any, component?: ReactType | any ) => void ) => void = 
	function( route ){
		return function( nextState, callback ){
			store.dispatch( setPageLoading() );
			switch( route ){
				case "index":
					moduleRequest = require( 'bundle?name=index.route!../routes/index' );
					break;
				case "login":
					moduleRequest = require( 'bundle?name=login.route!../routes/login' );
					break;
			}
			moduleRequest( ( module: any ) => {
				store.dispatch( setPageLoaded() );
				callback( null, module.default );
			});
		};
	};

export {loader};