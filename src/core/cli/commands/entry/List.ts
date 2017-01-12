import {Command, ICommand} from '../..';
import {Args} from '../..';
import {red} from 'chalk';

import {printFormattedEntries} from './EntryPrintUtils';
import {EntryManager, EntryModel, Log} from '../../../chook';

export class List extends Command implements ICommand{

	constructor( args: Args ){
		super( args );
		this.actions = [ "list", "ls", "l" ];
	}

	execute( args: Args ): void{
		new EntryManager()
			.getEntries()
			.then( ( entries: EntryModel[] ) => {
				printFormattedEntries( entries );
			})
			.catch( ( error: any ) => {
				Log( "error", red( error.message ) );
			});
	}

}