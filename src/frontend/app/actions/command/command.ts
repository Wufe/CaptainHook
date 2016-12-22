import {COMMANDS_FETCH, COMMANDS_FETCH_SUCCEEDED, COMMANDS_FETCH_FAILED} from '../../constants';

export const commandsFetch = ( snapshot?: string ) => {
	return {
		type: COMMANDS_FETCH,
		snapshot
	}
}

export const commandsFetchSucceeded = ( payload?: any ) => {
	return {
		type: COMMANDS_FETCH_SUCCEEDED,
		payload
	}
}

export const commandsFetchFailed = ( error: any ) => {
	return {
		type: COMMANDS_FETCH_FAILED,
		error
	}
}