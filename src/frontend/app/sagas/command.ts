import {takeEvery, takeLatest} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {commandsFetch, commandsFetchFailed, commandsFetchSucceeded} from '../actions/command';
import {COMMANDS_FETCH, COMMANDS_FETCH_FAILED, COMMANDS_FETCH_SUCCEEDED} from '../constants';
import {fetchCommands} from '../api';
import {State} from '../states';

export const delay = ( ms: number ) => {
	return new Promise( ( resolve ) => {
		setTimeout( resolve, ms );
	});
};

export const getSnapshot = ( state: State ) => state.command.snapshot;

export const watchCommandsFetch = function* (){
	yield* takeLatest( COMMANDS_FETCH, function* ( action: any ){
		try{
			const snapshot = yield select( getSnapshot );
			const payload = yield call( fetchCommands, snapshot );
			yield put( commandsFetchSucceeded( payload ) );
			yield call( delay, 500 );
		}catch( error ){
			yield put( commandsFetchFailed( error ) );
			yield call( delay, 5000 );
		}
		yield put( commandsFetch( `snapshot` ) );
		
		
	});
}