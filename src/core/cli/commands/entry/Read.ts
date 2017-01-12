import {Command, ICommand} from '../..';
import {Args} from '../..';

import {red} from 'chalk';

import {printFormattedEntries, printFormattedEntry} from './EntryPrintUtils';
import {Entry} from '../../../actors';
import {EntryManager, EntryModel, Log} from '../../../chook';

export class Read extends Command implements ICommand{

	constructor( args: Args ){
		super( args );
		this.actions = [ "read", "r", "show", "s" ];
	}

	execute( args: Args ): void{
		let {id} = args;
		let entryManager = new EntryManager();
			entryManager
			.getEntriesWithTasks()
			.then( () => {
				let foundEntryModel = entryManager.findById( id );
				if( !foundEntryModel )
					foundEntryModel = entryManager.findByName( `${id}` );
				if( !foundEntryModel )
					throw new Error( `Cannot find entry with id ${id}.` );
				printFormattedEntry( foundEntryModel );
			})
			.catch( ( error: any ) => {
				Log( "error", red( error.message ) );
			});
	}

}