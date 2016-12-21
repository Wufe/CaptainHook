/// <reference path="../../../../typings/index.d.ts" />

import {Action} from '../actions';
import {Entries, entries} from '../states';
import {ENTRIES_FETCH, ENTRIES_FETCH_FAILED, ENTRIES_FETCH_SUCCEEDED} from '../constants';

export default ( state: Entries = entries, action: Action<Entries> ): Entries => {
	let {payload, error, type} = action;
	switch( type ){
		case ENTRIES_FETCH:
			return state;
		case ENTRIES_FETCH_SUCCEEDED:
			let result: any = {};
			if( !payload.data )
				return Object.assign({}, state );
			payload.data.forEach( ( entry: any ) => {
				result[ entry[ 'id' ] ] = entry;
			});
			return Object.assign({}, state, result );
		case ENTRIES_FETCH_FAILED:
			return Object.assign({}, state, {});
		default:
			return state;
	}
};