/// <reference path="../../../../typings/index.d.ts" />

import {takeEvery, takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {loginSend, loginSucceeded, loginFailed} from '../actions/login';
import {login} from '../api';
import {LOGIN_SEND} from '../constants';
import {goto} from '..';

let watchLogin: () => any
= function* (){
	yield* takeLatest( LOGIN_SEND, function* ( action: any ){
		try{
			yield call( login, action.credentials.username, action.credentials.password );
			yield put( loginSucceeded() );
			goto( '/' );
		}catch( error ){
			yield put( loginFailed( error ) );
		}
	});
};



export{
	watchLogin	
};