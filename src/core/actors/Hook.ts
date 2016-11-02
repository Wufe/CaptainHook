/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import Database from '../data/Database';
import * as Sequelize from 'sequelize';

const model = Database.models.hook;

class Hook extends Actor<Hook>{

	constructor( hook: string ){
		super( model, { hook });
	}

}

Hook.model = model;

export default Hook;