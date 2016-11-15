/// <reference path="../../../../typings/index.d.ts" />

import {combineReducers, Reducer} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import app from './app';

const rootReducer: Reducer<any> = combineReducers({
	app,
	routing
});

export default rootReducer;