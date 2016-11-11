/// <reference path="../../../../typings/index.d.ts" />

import {combineReducers, Reducer} from 'redux';
import app from './app';

const rootReducer: Reducer<any> = combineReducers({
	app
});

export default rootReducer;