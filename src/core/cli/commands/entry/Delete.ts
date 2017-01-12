import {Command, ICommand} from '../..';
import {Args} from '../..';
import {green, red} from 'chalk';

import {printFormattedEntries, printFormattedEntry} from './EntryPrintUtils';
import {Entry} from '../../../actors';
import {EntryManager, EntryModel, Log, LogError, LogSuccess} from '../../../chook';

export class Delete extends Command implements ICommand{

	constructor( args: Args ){
		super( args );
		this.actions = [ "delete", "d", "del" ];
	}

	execute( args: Args ): void{
		let {id} = args;
		let entryManager = new EntryManager();
		entryManager
			.getEntries()
			.then( () => {
				let foundEntryModel = entryManager.findById( id );
				if( !foundEntryModel )
					foundEntryModel = entryManager.findByName( `${id}` );
				if( !foundEntryModel )
					throw new Error( `Cannot find entry with id ${id}.` );
				foundEntryModel
					.delete()
					.then( () => {
						LogSuccess( `Entry #${id} deleted.` );
					})
					.catch( LogError );
			})
			.catch( LogError );
	}

}