import {Command, ICommand} from '../..';
import {Args} from '../..';
import {ServerManager} from '../../../net';

export class Stop extends Command implements ICommand{

	constructor( args: Args ){
		super( args );
		this.action = "stop";
	}

	execute( args: Args ): void{
		new ServerManager().stop();
	}

}