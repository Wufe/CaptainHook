/// <reference path="../../../../typings/index.d.ts" />
/// <reference path="../../../../node_modules/@types/core-js/index.d.ts" />

import {Action} from '../actions';
import {App, app} from '../states';
import {PAGE_LOADING} from '../constants';
import {Reducer} from 'redux';

const appReducer: ( state: App, action: Action<App> ) => App =
	function( state = app, action ){
		switch( action.type ){
			case PAGE_LOADING:
				return Object.assign({}, state, action.payload);
			default:
				return state;
		}
	};

export default appReducer;