/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import Database from '../data/Database';
import * as Sequelize from 'sequelize';

const model = Database.models.user;

class User extends Actor<User>{

	constructor( username: string, password: string ){
		super( model, {
			username,
			password
		});
	}

}

User.model = model;

export default User;