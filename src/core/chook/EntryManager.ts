import {EntryModel, IEntry, Utils} from '.';
import {Entry as EntryActor} from '../actors';
import {Server} from '../net';

class EntryManager{

	entries: EntryModel[] = [];

	constructor(){}

	getEntries(){
		return new Promise( ( resolve, reject ) => {
			EntryActor
				.find
				.all()
				.then( ( entries: EntryActor[] ) => {
					let entryModels: EntryModel[] = entries.map( ( entry ) => {
						return new EntryModel( entry.getAll(), entry );
					});
					this.entries = entryModels;
					resolve( entryModels );
				})
				.catch( ( error: any ) => {
					reject( error );
				});
		});
	}

	getEntriesWithTasks(){
		return new Promise( ( resolve, reject ) => {
			this.getEntries()
				.then( ( entryModels: EntryModel[] ) => {
					return Promise.all( entryModels.map( ( entryModel ) => {
						return entryModel.loadTasks();
					}));
				})
				.then( ( entryModels: EntryModel[] ) => {
					this.entries = entryModels;
					resolve( entryModels );
				})
				.catch( ( error: any ) => {
					reject( error );
				});
		});
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