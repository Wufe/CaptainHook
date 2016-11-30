import Action from './Action';

import {Entry} from '../../actors';
import {EntryModel, EntryRepository, Environment, Log, Utils} from '../../chook';

import {green, red} from 'chalk';

class EntryAction extends Action{

	args: {
		action: string;
		entryAction: string;
		id?: number;
		name?: string;
		uri?: string;
		description?: string;
	};

	constructor(){
		super();
		this.actions = [ "entry", "entries", "e" ];
	}

	run(): void{
		super.run();
		this.args = Environment.get( 'args' );
		if( [ "list", "ls", "l" ].indexOf( this.args[ 'entryAction' ] ) > -1 ){
			this.listEntries();
		}else if( [ "create", "c" ].indexOf( this.args[ 'entryAction' ] ) > -1 ){
			this.createEntry();
		}else if( [ "update", "u" ].indexOf( this.args[ 'entryAction' ] ) > -1 ){
			this.updateEntry();
		}
	}

	getRepository(): EntryRepository{
		return new EntryRepository();
	}

	listEntries(): void{
		let entryRepository: EntryRepository = this.getRepository();
		entryRepository
			.loadEntries()
			.then( ( entries: EntryModel[] ) => {
				this.printFormattedEntries( entries );
			})
			.catch( ( error: any ) => {
				Log( "error", red( error.message ) );
			})
	}

	printFormattedEntries( entries: any[] ): void{
		Utils.printTableFromArray( entries.map( ( entry: any ) => {
			let {id, name, uri, description, created_at} = entry.get();
			return {
				id,
				name,
				uri,
				description,
				created_at
			};
		}));
	};

	createEntry(): void{
		console.log( green( `Creating new entry..` ) );
		let entryRepository: EntryRepository = this.getRepository();
		entryRepository
			.loadEntries()
			.then( () => {
				let {name, uri, description} = this.args;
				let entry: EntryModel = new EntryModel( entryRepository, {
					name,
					description,
					uri
				});
				entry.save().then( ( entry: Entry ) => {
					this.printFormattedEntries([ entry ]);
				})
				.catch( ( error: any ) => {
					Log( "error", red( error.message ), error );
				});
			})
			.catch( ( error: any ) => {
				Log( "error", red( error.message ) );
			});
	}

	updateEntry(): void{
		let entryRepository: EntryRepository = this.getRepository();
		let {id, name, uri, description} = this.args;
		console.log( green( `Updating entry #${id}..` ) );
		entryRepository
			.loadEntries()
			.then( () => {
				let foundEntryModel: EntryModel = entryRepository.findById( id );
				if( !foundEntryModel )
					throw new Error( `Cannot find entry with id ${id}.` );
				if( name )
					foundEntryModel.set( 'name', name );
				if( uri )
					foundEntryModel.set( 'uri', uri );
				if( description )
					foundEntryModel.set( 'description', description );
				foundEntryModel
					.save()
					.then( ( entry: Entry ) => {
						this.printFormattedEntries([ entry ]);
					}).catch( ( error: any ) => {
						Log( "error", red( error.message ), error );
					})
			})
			.catch( ( error: any ) => {
				Log( "error", red( error.message ) );
			});
	}

}

const entry: EntryAction = new EntryAction();
export default entry;