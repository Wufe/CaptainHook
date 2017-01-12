import {Command, ICommand} from '../..';
import {Args} from '../..';
import {green, red} from 'chalk';

import {printFormattedEntries, printFormattedEntry} from './EntryPrintUtils';
import {Entry} from '../../../actors';
import {EntryManager, EntryModel, Log, LogError, LogSuccess} from '../../../chook';

export class Create extends Command implements ICommand{

	constructor( args: Args ){
		super( args );
		this.actions = [ "create", "c" ];
	}

	execute( args: Args ): void{
		new EntryManager()
			.getEntries()
			.then( () => {
				let {name, uri, description, method} = this.args;
				let {pipe, content_type, x_hub_signature, secret} = this.args;
				new EntryModel({
					name,
					description,
					uri,
					method,
					options: {
						pipe,
						content_type,
						x_hub_signature,
						secret
					}
				})
				.save()
				.then( ( entry: Entry ) => {
					LogSuccess( "Entry created." );
					printFormattedEntry( entry );
				})
				.catch( LogError );
			})
			.catch( LogError );
	}

}