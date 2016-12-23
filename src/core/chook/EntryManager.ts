import {EntryModel, IEntry, Utils} from '.';
import {Entry as EntryActor} from '../actors';
import {Server} from '../net';

class EntryManager{

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
					return this.loadTasks( entries.map( ( entry: EntryActor ) => {
						return new EntryModel( this, entry.getAll(), entry );
					}));
				})
				.then( ( entryModels: EntryModel[] ) => {
					this.entries = entryModels;
					resolve( this.entries );
				})
				.catch( ( error: any ) => {
					reject( error );
				});
		});
	}

	loadTasks( entryModels: EntryModel[] ): Promise<any>{
		return new Promise( ( resolve, reject ) => {
			Promise.all( entryModels.map( ( entryModel: EntryModel ) => {
				return entryModel.loadTasks();
			}))
			.then( ( entryModels: EntryModel[] ) => {
				//console.log( entryModels );
				resolve( entryModels );
			})
			.catch( ( error: any ) => {
				reject( error );
			})
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

export default EntryManager;