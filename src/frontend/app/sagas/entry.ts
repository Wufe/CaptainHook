/// <reference path="../../../../typings/index.d.ts" />

import {takeEvery, takeLatest} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {setPageLoading, setPageLoaded} from '../actions/app';
import {entriesFetchSucceeded, entriesFetchFailed} from '../actions/entry';
import {ENTRIES_FETCH} from '../constants';
import {fetchEntries} from '../api/entry';

export const watchEntriesFetch = function* (){
	yield* takeLatest( ENTRIES_FETCH, function* (){
		try{
			yield put( setPageLoading() );
			const payload = yield call( fetchEntries );
			yield put( setPageLoaded() );
			yield put( entriesFetchSucceeded( payload ) );
		}catch( error ){
			yield put( entriesFetchFailed( error ) );
		}
	});
};