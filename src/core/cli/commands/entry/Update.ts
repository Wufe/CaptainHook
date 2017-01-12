import {Command} from '../../Command';
import {ICommand} from '../../ICommand';
import {Args} from '../..';
import {green, red} from 'chalk';

import {printFormattedEntries, printFormattedEntry} from './EntryPrintUtils';
import {Entry} from '../../../actors';
import {EntryManager, EntryModel, Log} from '../../../chook';

export class Update extends Command implements ICommand{

	constructor( args: Args ){
		super( args );
		this.actions = [ "update", "u" ];
	}

	execute( args: Args ): void{
		let {id, name, uri, description, method} = args;
		let entryManager = new EntryManager();
		entryManager
			.getEntries()
			.then( () => {
				let foundEntryModel = entryManager.findById( id );
				if( !foundEntryModel )
					foundEntryModel = entryManager.findByName( `${id}` );
				if( !foundEntryModel )
					throw new Error( `Cannot find entry with id ${id}.` );
				let options: {
					pipe: boolean;
					content_type: string;
					x_hub_signature: boolean;
					secret: string;
				} = {
					pipe: false,
					content_type: "text/plain",
					x_hub_signature: false,
					secret: null
				}
				let {pipe, content_type, x_hub_signature, secret, no_pipe, no_x_hub_signature, no_secret} = args;
				if( pipe )
					options.pipe = pipe;
				if( no_pipe )
					options.pipe = false;
				if( content_type )
					options.content_type = content_type;
				if( x_hub_signature )
					options.x_hub_signature = x_hub_signature;
				if( no_x_hub_signature )
					options.x_hub_signature = false;
				if( secret )
					options.secret = secret;
				if( no_secret )
					options.secret = null;
				if( name )
					foundEntryModel.set( 'name', name );
				if( uri )
					foundEntryModel.set( 'uri', uri );
				if( describe )
					foundEntryModel.set( 'description', description );
				if( method )
					foundEntryModel.set( 'method', method );
				foundEntryModel.set( 'options', options );
				foundEntryModel
					.save()
					.then( ( entry: Entry ) => {
						printFormattedEntry( entry );
					}).catch( ( error: any ) => {
						Log( "error", red( error.message ), error );
					});
			})
			.catch( ( error: any ) => {
				Log( "error", red( error.message ) );
			})
	}

}