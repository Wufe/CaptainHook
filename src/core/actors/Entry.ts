/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import {Access, AccessInterface, Database} from '../data';
import * as Sequelize from 'sequelize';

const model = Database.models.entry;

class Entry extends Actor<Entry>{

	static find: AccessInterface<Entry>;

	constructor( name?: string, description?: string, uri?: string ){
		super( model, { name, description, uri });
	}

}

Entry.find = ( new Access( Entry, model ) ).getInterface();

export default Entry;