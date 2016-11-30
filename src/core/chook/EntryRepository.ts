import {EntryModel, IEntry, Utils} from '.';
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
					this.entries = entries.map( ( entry: EntryActor ) => {
						return new EntryModel( this, entry.get(), entry );
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

	findById( id: number ): EntryModel{
		return this.entries.find( ( entry: EntryModel ) => {
			return entry.getId() == id;
		});
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