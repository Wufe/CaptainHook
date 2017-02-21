/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import {Access, AccessInterface, Database} from '../data';
import {truncateText} from '../chook/Utils';
import * as Moment from 'moment';

const model = Database.models.task;

export interface TaskData{
	command?: string;
	working_dir?: string;
	description?: string;
	entry_id: number;
	environment?: {
		[key:string]: string;
	};
}

class Task extends Actor<Task>{

	static find: AccessInterface<Task>;

	constructor( data: TaskData ){
		super( model, data );
		this.fields = [
			"id",
			"command",
			"working_dir",
			"description",
			"environment",
			"created_at"
		];
		this.mutators = {
			created_at: ( value: any ) => Moment( value ).fromNow(),
			environment: ( value: any ) => {
				if( !value )
					return null;
				let environment: string[] = [];
				for( let key in value )
					environment.push( `${key}=${value[key]}` );
				return truncateText( environment.join( ', ' ), 35 );
			},
			description: ( value: any ) => truncateText( value, 35 )
		};
		this.hidden = [
			"entry_id",
			"updated_at"
		];
	}

}

Task.find = ( new Access( Task, model ) ).getInterface();

export default Task;