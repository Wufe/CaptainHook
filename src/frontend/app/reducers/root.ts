/// <reference path="../../../../typings/index.d.ts" />

import {combineReducers, Reducer} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import app from './app';
import entries from './entries';
import command from './command';

const rootReducer: Reducer<any> = combineReducers({
	app,
	command,
	entries,
	routing
});

export default rootReducer;