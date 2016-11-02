/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import Database from '../data/Database';
import * as Sequelize from 'sequelize';

class Hook extends Actor<Hook>{

	constructor( hook: string ){
		super({ hook });
	}

}

Hook.model = Database.models.hook;

export default Hook;