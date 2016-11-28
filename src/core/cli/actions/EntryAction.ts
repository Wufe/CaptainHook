import Action from './Action';

import {Entry} from '../../actors';
import {EntryModel, EntryRepository, Environment, Utils} from '../../chook';

import {green, red} from 'chalk';

class EntryAction extends Action{

	args: {
		action: string;
		entryAction: string;
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
		}
	}

	listEntries(): void{
		let entryRepository: EntryRepository = new EntryRepository();
		entryRepository
			.loadEntries()
			.then( ( entries: EntryModel[] ) => {
				this.printFormattedEntries( entries );
			})
			.catch( ( error: any ) => {
				console.error( red( error.message ) );
			})
	}

	printFormattedEntries( entries: EntryModel[] ): void{
		Utils.printTableFromArray( entries.map( ( entry: any ) => {
			let {id, name, uri, description, created_at} = entry.data;
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
		let entryRepository: EntryRepository = new EntryRepository();
		let entry: EntryModel = new EntryModel( entryRepository );
		entry.save().then( ( entry: Entry ) => {
			let {created_at, id, description, name, uri} = entry.get();
			Utils.printTableFromArray([{
				id,
				name,
				uri,
				description,
				created_at
			}]);
		});
	}

}

const entry: EntryAction = new EntryAction();
export default entry;