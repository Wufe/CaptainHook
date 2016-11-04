/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../node_modules/@types/core-js/index.d.ts" />

import * as Jwt from 'jsonwebtoken';
import {User} from '../actors';

export default class Token{

	user: User;

	constructor( user?: User ){
		this.user = user;
	}

}