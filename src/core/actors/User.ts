/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import Database from '../data/Database';
import * as Sequelize from 'sequelize';

class User extends Actor<User>{

	constructor( username: string, password: string ){
		super({
			username,
			password
		});
	}

}

User.model = Database.models.user;

export default User;