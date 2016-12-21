/// <reference path="../../../../typings/index.d.ts" />

import * as axios from 'axios';
import {APP_URI} from '.';

export const login = ( username: string, password: string ): any => {
	return axios.post( `${APP_URI}/auth`, {username, password});
};