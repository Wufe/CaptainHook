/// <reference path="../../../typings/index.d.ts" />

import {EntryModel} from '.';
import {Task} from '../actors';
import {TaskData} from '../actors/Task';

import {green} from 'chalk';

export type TaskCreationData = TaskData & {
	after?: number;
	env?: string[];
};

export default class TaskManager{

	entryModel: EntryModel;

	constructor( entryModel: EntryModel ){
		this.entryModel = entryModel;
	}

	createTask({command, working_dir, description, entry_id, after, env}: TaskCreationData): Promise<void>{
		return new Promise<void>( ( resolve, reject ) => {
			if( !command )
				throw new Error( `Not a valid command.` );
			let environment: {
				[key: string]: string;
			} = {};
			env.forEach( ( envKeyValue: string ) => {
				if( envKeyValue.indexOf( '=' ) > -1 ){
					let [key, value] = envKeyValue.split( '=' );
					if( key && value ){
						environment[ key ] = value;
					}
				}
			});
			let task: Task = new Task({
				command,
				working_dir,
				description,
				entry_id,
				environment
			});
			if( after !== undefined && after !== null ){
				let reference = this.findReference( after );
				if( reference == -1 )
					throw new Error( `There is not task with ID ${after}.` );
			}
			let savePromise = task.save();
			if( after !== undefined ){
				savePromise
					.then( ( task: Task ) => {
						return this.entryModel.updateSchema( task, after );
					});
			}
			savePromise.then (() => {
				resolve();
			})
			.catch( ( error: any ) => {
				reject( error );
			});
		});
	}

	findReference( after: number ): number{
		return this.entryModel.getTasks().findIndex( ( task: Task ) => {
			return task.get( 'id' ) == after;
		});
	}

}