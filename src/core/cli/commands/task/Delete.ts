import {Command, ICommand} from '../..';
import {Args} from '../..';

import {EntryManager, EntryModel, Log, LogError, LogSuccess, TaskManager} from '../../../chook';
import {Task} from '../../../actors';

export class Delete extends Command implements ICommand{

	constructor( args: Args ){
		super( args );
		this.actions = [ "delete", "del", "d" ];
	}

	execute( args: Args ): void{
		let {task_id} = args;
		let entryManager = new EntryManager();
		Task
			.find
			.byId( task_id )
			.then( ( task: Task ) => {
				task.delete();
				LogSuccess( `Command deleted.` );
			})
			.catch( LogError );
	}

}