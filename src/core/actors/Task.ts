/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import {Access, AccessInterface, Database} from '../data';
import * as Sequelize from 'sequelize';

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
		this.hidden = [
			"entry_id",
			"updated_at"
		];
	}

}

Task.find = ( new Access( Task, model ) ).getInterface();

export default Task;