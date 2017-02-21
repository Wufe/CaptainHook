/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import {Access, AccessInterface, Database} from '../data';
import * as Moment from 'moment';

const model = Database.models.entry;

interface EntryData{
	name?: string;
	description?: string;
	method?: string;
	uri?: string;
	options?: any;
	schema: {
		[id: number]: number;
	}
}

class Entry extends Actor<Entry>{

	static find: AccessInterface<Entry>;

	constructor( data: EntryData ){
		super( model, data );
		this.fields = [
			"id",
			"name",
			"uri",
			"description",
			"method",
			"schema",
			"options",
			"created_at",
			"updated_at"
		];
		this.mutators = {
			created_at: ( value: any ) => Moment( value ).fromNow()
		};
		this.hidden = [
			"schema",
			"options",
			"updated_at"
		];
	}

}

Entry.find = ( new Access( Entry, model ) ).getInterface();

export default Entry;