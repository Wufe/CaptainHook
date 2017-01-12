import {CommandParser} from './CommandParser'
import {Config} from './commands/Config';
import {Server} from './commands/Server';
import {Entry} from './commands/Entry';
import {Task} from './commands/Task';
import {Args} from '.';

export class Dispatcher extends CommandParser{

	constructor( args: Args ){
		super( args );
		this.commands = [
			new Config( args ),
			new Entry( args ),
			new Server( args ),
			new Task( args )
		];
	}

}