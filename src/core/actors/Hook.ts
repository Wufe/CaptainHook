/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import {Access, AccessInterface, Database} from '../data';
import * as Sequelize from 'sequelize';

const model = Database.models.hook;

interface HookData{
	hook?: string;
}

class Hook extends Actor<Hook>{

	static find: AccessInterface<Hook>;

	constructor( data: HookData ){
		super( model, data );
	}

}

Hook.find = ( new Access( Hook, model ) ).getInterface();

export default Hook;