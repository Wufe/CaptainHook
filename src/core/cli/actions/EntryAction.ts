import Action from './Action';

import {Entry, Task} from '../../actors';
import {EntryModel, EntryManager, Environment, getEnvironment, Log, Utils} from '../../chook';
import {truncateText} from '../../chook/Utils';

import {green, red} from 'chalk';
import * as Moment from 'moment';

const COMMAND_LIST = [ "list", "ls", "l" ];
const COMMAND_CREATE = [ "create", "c" ];
const COMMAND_READ = [ "read", "r", "show", "s" ];
const COMMAND_UPDATE = [ "update", "u" ];
const COMMAND_DELETE = [ "delete", "d", "del" ];

class EntryAction extends Action{

	args: {
		action: string;
		entryAction: string;
		id?: number;
		name?: string;
		uri?: string;
		description?: string;
		method?: string;
		pipe?: boolean;
		content_type?: string;
		x_hub_signature?: boolean;
		secret?: string;
		no_pipe?: boolean;
		no_x_hub_signature?: boolean;
		no_secret?: boolean;
	};

	environment: Environment;

	constructor(){
		super();
		this.environment = getEnvironment();
		this.actions = [ 
			"entry", "entries", "e",
			...COMMAND_LIST,
			...COMMAND_CREATE,
			...COMMAND_READ,
			...COMMAND_UPDATE,
			...COMMAND_DELETE
		];
	}

	run(): void{
		super.run();
		this.args = this.environment.get( 'args' );
		if( COMMAND_LIST.indexOf( this.args[ 'entryAction' ] ) > -1 ||
			COMMAND_LIST.indexOf( this.args[ 'action' ] ) > -1 ){
			this.listEntries();
		}else if( COMMAND_CREATE.indexOf( this.args[ 'entryAction' ] ) > -1 ||
			COMMAND_CREATE.indexOf( this.args[ 'action' ] ) > -1 ){
			this.createEntry();
		}else if( COMMAND_READ.indexOf( this.args[ 'entryAction' ] ) > -1 ||
			COMMAND_READ.indexOf( this.args[ 'action' ] ) > -1 ){
			this.readEntry();
		}else if( COMMAND_UPDATE.indexOf( this.args[ 'entryAction' ] ) > -1 ||
			COMMAND_UPDATE.indexOf( this.args[ 'action' ] ) > -1 ){
			this.updateEntry();
		}else if( COMMAND_DELETE.indexOf( this.args[ 'entryAction' ] ) > -1 ||
			COMMAND_DELETE.indexOf( this.args[ 'action' ] ) > -1 ){
			this.deleteEntry();
		}
	}

	getRepository(): EntryManager{
		return new EntryManager();
	}

	listEntries(): void{
		let entryManager: EntryManager = this.getRepository();
		entryManager
			.loadEntries()
			.then( ( entries: EntryModel[] ) => {
				this.printFormattedEntries( entries );
			})
			.catch( ( error: any ) => {
				Log( "error", red( error.message ) );
			})
	}

	printFormattedEntries( entries: any[] ): void{
		Utils.printTableFromArray( entries.map( entry => entry.get() ) );
	};

	printFormattedEntry( entry: any ): void{
		console.log( 'Entry:' );
		let params: any = entry.get();
		Utils.printTableFromArray([
			params
		]);
		
		let options: any = entry.get( 'options' );
		console.log( '\nOptions:' );
		options.secret = '*******';
		Utils.printTableFromArray([
			options
		]);

		let tasks: any[] = [];
		if( entry.getTasks ){
			tasks = entry.getTasks();
		}else if( entry.tasks ){
			tasks = entry.tasks;
		}else if( entry.data.tasks ){
			tasks = entry.data.tasks;
		}
		if( tasks && tasks.length ){
			console.log( '\nCommands:' );
			Utils.printTableFromArray( tasks.map( ( task: Task ) => task.get()));
		}
	}

	createEntry(): void{
		console.log( green( `Creating new entry..` ) );
		let entryManager: EntryManager = this.getRepository();
		entryManager
			.loadEntries()
			.then( () => {
				let {name, uri, description, method} = this.args;
				let {pipe, content_type, x_hub_signature, secret} = this.args;
				let entry: EntryModel = new EntryModel( entryManager, {
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
				});
				entry.save().then( ( entry: Entry ) => {
					this.printFormattedEntry( entry );
				})
				.catch( ( error: any ) => {
					Log( "error", red( error.message ), error );
				});
				
			})
			.catch( ( error: any ) => {
				Log( "error", red( error.message ) );
			});
	}

	readEntry(): void{
		let entryManager: EntryManager = this.getRepository();
		let {id} = this.args;
		entryManager
			.loadEntries()
			.then( () => {
				let foundEntryModel: EntryModel = entryManager.findById( id );
				if( !foundEntryModel )
					foundEntryModel = entryManager.findByName( `${id}` );
				if( !foundEntryModel )
					throw new Error( `Cannot find entry with id ${id}.` );
				this.printFormattedEntry( foundEntryModel );
			})
			.catch( ( error: any ) => {
				Log( "error", red( error.message ) );
			});
	}

	updateEntry(): void{
		let entryManager: EntryManager = this.getRepository();
		let {id, name, uri, description, method} = this.args;
		console.log( green( `Updating entry #${id}..` ) );
		entryManager
			.loadEntries()
			.then( () => {
				let foundEntryModel: EntryModel = entryManager.findById( id );
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
				};
				let {pipe, content_type, x_hub_signature, secret, no_pipe, no_x_hub_signature, no_secret} = this.args;
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
				if( description )
					foundEntryModel.set( 'description', description );
				if( method )
					foundEntryModel.set( 'method', method );
				foundEntryModel.set( 'options', options );
				foundEntryModel
					.save()
					.then( ( entry: Entry ) => {
						this.printFormattedEntry( entry );
					}).catch( ( error: any ) => {
						Log( "error", red( error.message ), error );
					})
			})
			.catch( ( error: any ) => {
				Log( "error", red( error.message ) );
			});
	}

	deleteEntry(): void{
		let entryManager: EntryManager = this.getRepository();
		let {id} = this.args;
		console.log( green( `Deleting entry #${id}..` ) );
		entryManager
			.loadEntries()
			.then( () => {
				let foundEntryModel: EntryModel = entryManager.findById( id );
				if( !foundEntryModel )
					foundEntryModel = entryManager.findByName( `${id}` );
				if( !foundEntryModel )
					throw new Error( `Cannot find entry with id ${id}.` );
				foundEntryModel
					.delete()
					.then( () => {
						console.log( `Entry #${id} deleted.` );
					}).catch( ( error: any ) => {
						Log( "error", red( error.message ), error );
					});
			})
			.catch( ( error: any ) => {
				Log( "error", red( error.message ) );
			})
	}

}

const entry: EntryAction = new EntryAction();
export default entry;