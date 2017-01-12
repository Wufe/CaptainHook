import {ICommand} from '../ICommand';
import {CommandParser} from '../CommandParser';
import {Args} from '..';

import {List} from './entry/List';
import {Create} from './entry/Create';
import {Read} from './entry/Read';
import {Update} from './entry/Update';
import {Delete} from './entry/Delete';

const COMMAND_ENTRY = [ "entry", "entries", "e" ];
const COMMAND_LIST = [ "list", "ls", "l" ];
const COMMAND_CREATE = [ "create", "c" ];
const COMMAND_READ = [ "read", "r", "show", "s" ];
const COMMAND_UPDATE = [ "update", "u" ];
const COMMAND_DELETE = [ "delete", "d", "del" ];

export class Entry extends CommandParser implements ICommand{

	constructor( args: Args ){
		super( args );
		this.args = this.pruneArgs( args );
		this.actions = [
			...COMMAND_ENTRY,
			...COMMAND_LIST,
			...COMMAND_CREATE,
			...COMMAND_READ,
			...COMMAND_UPDATE,
			...COMMAND_DELETE
		];
		this.commands = [
			new List( this.args ),
			new Create( this.args ),
			new Read( this.args ),
			new Update( this.args ),
			new Delete( this.args )
		];
	}

	execute( args: Args ): void{
		if( COMMAND_ENTRY.indexOf( args[ 'action' ] ) == -1 ){
			this.args = {
				...{ action: 'entry' },
				...{ entryAction: args[ 'action' ] },
				...this.args
			};
			this.args = this.pruneArgs( this.args );
		}
		this.parseCommand();
		
	}

}