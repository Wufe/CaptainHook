/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import {Access, AccessInterface, Database} from '../data';
import * as Sequelize from 'sequelize';

const model = Database.models.entry;

interface EntryData{
	name?: string;
	description?: string;
	uri?: string;
}

class Entry extends Actor<Entry>{

	static find: AccessInterface<Entry>;

	constructor( data: EntryData ){
		super( model, data );
		this.hidden = [
			"updated_at"
		];
	}

}

Entry.find = ( new Access( Entry, model ) ).getInterface();

export default Entry;