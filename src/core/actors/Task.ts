/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import {Access, AccessInterface, Database} from '../data';
import * as Sequelize from 'sequelize';

const model = Database.models.task;

interface TaskData{
	command?: string;
	working_dir?: string;
	description?: string;
	entry_id?: number;
}

class Task extends Actor<Task>{

	static find: AccessInterface<Task>;

	constructor( data: TaskData ){
		super( model, data );
		this.hidden = [
			"updated_at"
		];
	}

}

Task.find = ( new Access( Task, model ) ).getInterface();

export default Task;