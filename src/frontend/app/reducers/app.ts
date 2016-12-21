/// <reference path="../../../../typings/index.d.ts" />

import {Action} from '../actions';
import {App, app} from '../states';
import {NOTIFICATION_DELETE, PAGE_LOADING, LOGIN_SEND, LOGIN_FAILED, LOGIN_SUCCEEDED} from '../constants';
import {Reducer} from 'redux';

const appReducer: ( state: App, action: Action<App> ) => App =
	function( state = app, action ){

		let {payload} = action;
		let {error} = action;

		switch( action.type ){
			case PAGE_LOADING:
				return Object.assign({}, state, payload);
			case NOTIFICATION_DELETE:
				return Object.assign({}, state, {
					notifications: state.notifications.filter( ( notification ) => {
						if( notification.id == payload.id )
							return false;
						return true;
					})
				});
			case LOGIN_SEND:
				return Object.assign({}, state, {
					auth: Object.assign({}, state.auth, {
						logging: true
					})
				});
			case LOGIN_SUCCEEDED:
				return Object.assign({}, state, {
					auth: Object.assign({}, state.auth, {
						logging: false,
						logged: true
					})
				});
			case LOGIN_FAILED:
				return Object.assign({}, state, {
					auth: Object.assign({}, state.auth, {
						logging: false,
						logged: false,
						error
					})
				});
			default:
				return state;
		}
	};

export default appReducer;