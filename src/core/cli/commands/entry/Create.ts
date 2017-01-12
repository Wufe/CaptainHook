import {Command} from '../../Command';
import {ICommand} from '../../ICommand';
import {Args} from '../..';
import {green, red} from 'chalk';

import {printFormattedEntries, printFormattedEntry} from './EntryPrintUtils';
import {Entry} from '../../../actors';
import {EntryManager, EntryModel, Log} from '../../../chook';

export class Create extends Command implements ICommand{

	constructor( args: Args ){
		super( args );
		this.actions = [ "create", "c" ];
	}

	execute( args: Args ): void{
		console.log( green( `Creating new entry..` ) );
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
					printFormattedEntry( entry );
				})
				.catch( ( error: any ) => {
					Log( "error", red( error.message ), error );
				});
			})
			.catch( ( error: any ) => {
				Log( "error", red( error.message ) );
			});
	}

}