/// <reference path="../../../../typings/index.d.ts" />

import {ReactType} from 'react';
import {RouterState} from 'react-router';

let moduleRequest: ( module: any ) => void;

const loader: ( route: string ) => 
	( nextState: RouterState, callback: ( error: any, component?: ReactType ) => void ) => void = 
	function( route ){
		return function( nextState, callback ){
			switch( route ){
				case "index":
					moduleRequest = require( 'bundle?name=index.route!../routes/index' );
					break;
			}
			moduleRequest( ( module: any ) => {
				callback( null, module.default );
			});
		};
	};

export {loader};