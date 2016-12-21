import {ENTRIES_FETCH, ENTRIES_FETCH_FAILED, ENTRIES_FETCH_SUCCEEDED} from '../../constants';

export const entriesFetch = () => {
	return {
		type: ENTRIES_FETCH
	};
}

export const entriesFetchFailed = ( error: any ) => {
	return {
		type: ENTRIES_FETCH_FAILED,
		error
	};
}

export const entriesFetchSucceeded = ( payload: any ) => {
	return {
		type: ENTRIES_FETCH_SUCCEEDED,
		payload
	};
}