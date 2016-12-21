/// <reference path="../../../../typings/index.d.ts" />

import * as axios from 'axios';
import {API_URI} from '.';

export const fetchEntries = (): any => {
	return axios.get( `${API_URI}/entry` );
};