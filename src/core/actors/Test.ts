/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import {Access, AccessInterface, Database} from '../data';
import * as Sequelize from 'sequelize';

const model = Database.models.test;

class Test extends Actor<Test>{

	static find: AccessInterface<Test>;

	constructor( test?: string ){
		super( model, { test });
	}

}

Test.find = ( new Access( Test, model ) ).getInterface();

export default Test;