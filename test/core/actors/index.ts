/// <reference path="../../../typings/index.d.ts" />

import {Actor, Hook, User} from '../../../src/core/actors';
import {Database} from '../../../src/core/data';

import * as Sequelize from 'sequelize';

export interface ActorType{
	name: string;
	class: any;
	model: Sequelize.Model<any, any>;
	table: string;
};

let Actors: ActorType[] = [
	{
		name: 'User',
		class: User,
		model: Database.models.user,
		table: 'users'
	},
	{
		name: 'Hook',
		class: Hook,
		model: Database.models.hook,
		table: 'hooks'
	}
];

export {Actors};