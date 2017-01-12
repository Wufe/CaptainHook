import {Command, ICommand} from '../..';
import {Args} from '../..';
import {green, red} from 'chalk';
import {LogSuccess} from '../../../chook';
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
					LogSuccess( red( `The server is not online.` ) );
				}else{
					LogSuccess( green( `The server is online.` ) );
				}
			});
	}

}