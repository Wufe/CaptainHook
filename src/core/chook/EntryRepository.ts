import {Entry, IEntry} from '.';
import {Server} from '../net';

class EntryRepository{

	entries: Entry[] = [];
	server: Server;

	constructor( server: Server ){
		this.server = server;
	}
	
	getEntries(): Entry[] {
		return this.entries;
	}

	findByUri( uri: string ): Entry{
		return this.entries.find( ( entry: Entry ) => {
			return entry.getUri() == uri;
		});
	}

	findByName( name: string ): Entry{
		return this.entries.find( ( entry: Entry ) => {
			return entry.getName() == name;
		});
	}
}

export default EntryRepository;