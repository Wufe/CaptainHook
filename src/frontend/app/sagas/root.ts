/// <reference path="../../../../typings/index.d.ts" />

import {watchPing} from './app';
import {watchLogin} from './login';
import {watchEntriesFetch} from './entry';
import {fork} from 'redux-saga/effects';

let rootSaga: () => any 
= function* (){
	yield fork( watchPing );
	yield fork( watchLogin );
	yield fork( watchEntriesFetch );
};

export default rootSaga;