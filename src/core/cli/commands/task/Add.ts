import {Command} from '../../Command';
import {ICommand} from '../../ICommand';
import {Args} from '../..';
import {green, red} from 'chalk';
import {createInterface} from 'readline';

import {EntryManager, EntryModel, Log, TaskManager} from '../../../chook';
import {Task} from '../../../actors';

export class Add extends Command implements ICommand{

	constructor( args: Args ){
		super( args );
		this.actions = [ "add", "create", "c", "a" ];
	}

	execute( args: Args ): void{
		let {entry_id} = args;
		let entryManager = new EntryManager();
		entryManager
			.getEntries()
			.then( () => {
				let foundEntryModel = entryManager.findById( entry_id );
				if( !foundEntryModel )
					foundEntryModel = entryManager.findByName( entry_id );
				if( !foundEntryModel )
					throw new Error( `Cannot find entry with id ${entry_id}.` );
				this.addTaskToEntryModel( foundEntryModel );
			})
			.catch( ( error: any ) => {
				Log( "error", red( error.message ) );
			});
	}

	addTaskToEntryModel( entryModel: EntryModel ){
		let readline = createInterface({
			input: process.stdin,
			output: process.stdout
		});
		readline.question( `$ `, ( command: string ) => {
			readline.question( `Working directory (leave blank for inherit): `, ( working_dir: string ) => {
				readline.question( `Description: `, ( description: string ) => {
					readline.question( `Place it after task id (leave blank for default): `, ( afterString: string ) => {
						let after: number = null;
						if( afterString )
							after = parseInt( afterString );
						let taskManager = new TaskManager( entryModel );
						let {environment: env} = this.args;
						taskManager.createTask({
							command,
							working_dir,
							description,
							entry_id: entryModel.getId(),
							after,
							env
						})
						.then( () => {
							console.log( green( `Command saved.` ) );
						})
						.catch( ( error: any ) => {
							Log( "error", red( error.message ) );
						});
						readline.close();
					});
				});
			});
		});
	}

}