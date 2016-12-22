import {API_URI} from '.';
import {get} from 'axios';

export const fetchCommands = ( snapshot?: string ): any => {
	let uri = `${API_URI}/log`;
	if( snapshot )
		uri += `?snapshot=${snapshot}`
	return get( uri );
};