/// <reference path="../../../../../typings/index.d.ts" />

import {takeEvery, takeLatest} from 'redux-saga';
import {put} from 'redux-saga/effects';
import {PING, PING_SUCCEEDED, PING_FAILED} from '../../constants';
import {Action} from '../../';


let watchPing: () => any
= function* (){
	yield* takeEvery( PING, sendPing );

};

let sendPing: () => any 
= function* (){
	try{
		yield put( pingSucceeded() );
	}catch( error ){
		yield put( pingFailed() );
	}
}

let pingSucceeded: () => Action<any> = 
	() => {
		return {
			type: PING_SUCCEEDED
		};
	};

let pingFailed: () => Action<any> =
	() => {
		return {
			type: PING_FAILED
		};
	}


export default watchPing;