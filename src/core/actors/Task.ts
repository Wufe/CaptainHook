/// <reference path="../../../typings/index.d.ts" />

import Actor from './Actor';
import {Access, AccessInterface, Database} from '../data';
import * as Sequelize from 'sequelize';

const model = Database.models.task;

class Task extends Actor<Task>{

	static find: AccessInterface<Task>;

	constructor( command?: string, working_dir?: string, description?: string, entry_id?: number ){
		super( model, { command, working_dir, description, entry_id });
		this.hidden = [
			"updated_at"
		];
	}

}

Task.find = ( new Access( Task, model ) ).getInterface();

export default Task;