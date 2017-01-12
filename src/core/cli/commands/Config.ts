import {CommandParser, ICommand} from '..';
import {Args} from '..';

import {Get} from './config/Get';
import {Set} from './config/Set';

export class Config extends CommandParser implements ICommand{

	constructor( args: Args ){
		super( args );
		this.args = this.pruneArgs( args );
		this.actions = [ "configuration", "config", "conf" ];
		this.commands = [
			new Get( this.args ),
			new Set( this.args )
		];
	}

	execute( args: Args ): void{
		this.parseCommand();
	}

}