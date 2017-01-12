import {ICommand} from '../ICommand';
import {CommandParser} from '../CommandParser';
import {Args} from '..';

import {Add} from './task/Add';
import {Delete} from './task/Delete';

export class Task extends CommandParser implements ICommand{

	constructor( args: Args ){
		super( args );
		this.args = this.pruneArgs( args );
		this.actions = [ "task", "t" ];
		this.commands = [
			new Add( this.args ),
			new Delete( this.args )
		];
	}

	execute( args: Args ): void{
		this.parseCommand();
	}

}