import {Command, ICommand} from '../..';
import {Args} from '../..';
import {green, red} from 'chalk';

import {ServerManager} from '../../../net';

export class Status extends Command implements ICommand{

	constructor( args: Args ){
		super( args );
		this.action = "status";
	}

	execute( args: Args ): void{
		new ServerManager()
			.isOnline()
			.then( ( online: boolean ) => {
				if( !online ){
					console.log( red( `The server is not online.` ) );
				}else{
					console.log( green( `The server is online.` ) );
				}
			});
	}

}