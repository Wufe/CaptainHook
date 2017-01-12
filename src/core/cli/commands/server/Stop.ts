import {Command} from '../../Command';
import {ICommand} from '../../ICommand';
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