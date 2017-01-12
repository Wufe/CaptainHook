import {CommandParser, ICommand} from '..';
import {Args} from '..';

import {Start} from './server/Start';
import {Stop} from './server/Stop';
import {Status} from './server/Status';

export class Server extends CommandParser implements ICommand{

	constructor( args: Args ){
		super( args );
		this.actions = [ "start", "stop", "status" ];
		this.commands = [
			new Start( this.args ),
			new Stop( this.args ),
			new Status( this.args )
		];
	}

	execute( args: Args ): void{
		this.parseCommand();
	}

}