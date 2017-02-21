/// <reference path="../../../typings/index.d.ts" />

import {Actor, Entry, User, Task, Test} from '../../../src/core/actors';
import {Database} from '../../../src/core/data';

export interface ActorType{
	name: string;
	class: any;
	model: any;
	table: string;
};

let Actors: ActorType[] = [
	{
		name: 'User',
		class: User,
		model: Database.models.user,
		table: 'users'
	},
	{
		name: 'Entry',
		class: Entry,
		model: Database.models.entry,
		table: 'entries'
	},
	{
		name: 'Task',
		class: Task,
		model: Database.models.task,
		table: 'tasks'
	},
	{
		name: 'Test',
		class: Test,
		model: Database.models.test,
		table: 'tests'
	}
];

export {Actors};