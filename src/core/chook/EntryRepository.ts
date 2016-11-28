import {EntryModel, IEntry} from '.';
import {Entry as EntryActor} from '../actors';
import {Server} from '../net';

class EntryRepository{

	entries: EntryModel[] = [];
	server: Server;

	constructor( server?: Server ){
		this.server = server;
	}

	loadEntries(): Promise<EntryModel[]>{

		return new Promise<EntryModel[]>( ( resolve, reject ) => {
			EntryActor
				.find
				.all()
				.then( ( entries: EntryActor[] ) => {
					this.entries = [];
					entries.forEach( ( entry: EntryActor ) => {
						this.entries.push( new EntryModel( this, entry.get() ) );
					});
					resolve( this.entries );
				})
				.catch( ( error: any ) => {
					reject( error );
				});
		});
	}
	
	getEntries(): EntryModel[] {
		return this.entries;
	}

	findByUri( uri: string ): EntryModel{
		return this.entries.find( ( entry: EntryModel ) => {
			return entry.getUri() == uri;
		});
	}

	findByName( name: string ): EntryModel{
		return this.entries.find( ( entry: EntryModel ) => {
			return entry.getName() == name;
		});
	}
}

export default EntryRepository;