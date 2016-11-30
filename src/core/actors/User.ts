/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import {Access, AccessInterface, Database} from '../data';
import * as Sequelize from 'sequelize';

const model = Database.models.user;

interface UserData{
	username?: string;
	password?: string;
}

class User extends Actor<User>{

	static find: AccessInterface<User>;

	constructor( data: UserData ){
		super( model, data );
		this.hidden = [
			"password",
			"updated_at"
		];
	}

}

User.find = ( new Access( User, model ) ).getInterface();

export default User;