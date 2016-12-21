import {LOGIN_SEND, LOGIN_FAILED, LOGIN_SUCCEEDED} from '../../constants';

export const loginSend = ( username: string, password: string ) => {
	return {
		type: LOGIN_SEND,
		credentials: {
			username,
			password
		}
	};
}

export const loginFailed = ( error: any ) => {
	return {
		type: LOGIN_FAILED,
		error
	};
}

export const loginSucceeded = () => {
	return {
		type: LOGIN_SUCCEEDED
	}
};