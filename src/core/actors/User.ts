/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import {Access, AccessInterface, Database} from '../data';
import * as Sequelize from 'sequelize';

const model = Database.models.user;

class User extends Actor<User>{

	static find: AccessInterface<User>;

	constructor( username?: string, password?: string ){
		super( model, {
			username,
			password
		});
	}

}

User.find = ( new Access( User, model ) ).getInterface();

export default User;