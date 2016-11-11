/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../../node_modules/@types/core-js/index.d.ts" />

import * as actions from '../actions';
import {app as appState} from './state';

const appReducer: ( state: any, action: any ) => any =
	function( state = appState, action ){
		switch( action.type ){
			case actions.LOAD_ACTION:
				return Object.assign({}, state, { loading: true });
			default:
				return state;
		}
	};

export default appReducer;