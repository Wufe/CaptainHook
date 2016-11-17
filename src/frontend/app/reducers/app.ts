/// <reference path="../../../../typings/index.d.ts" />

import {Action} from '../actions';
import {App, app} from '../states';
import {NOTIFICATION_DELETE, PAGE_LOADING} from '../constants';
import {Reducer} from 'redux';

const appReducer: ( state: App, action: Action<App> ) => App =
	function( state = app, action ){

		let {payload} = action;

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
			default:
				return state;
		}
	};

export default appReducer;