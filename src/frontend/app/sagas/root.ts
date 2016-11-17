/// <reference path="../../../../typings/index.d.ts" />

import {watchPing} from './app';
import {fork} from 'redux-saga/effects';

let rootSaga: () => any 
= function* (){
	yield fork( watchPing );
};

export default rootSaga;