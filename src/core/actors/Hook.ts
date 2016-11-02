/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import {Access, AccessInterface, Database} from '../data';
import * as Sequelize from 'sequelize';

const model = Database.models.hook;

class Hook extends Actor<Hook>{

	static find: AccessInterface<Hook>;

	constructor( hook?: string ){
		super( model, { hook });
	}

}

Hook.find = ( new Access( Hook, model ) ).getInterface();

export default Hook;