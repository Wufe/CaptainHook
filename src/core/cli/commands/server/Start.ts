import {Command, ICommand} from '../..';
import {Args} from '../..';
import {ServerManager} from '../../../net';

export class Start extends Command implements ICommand{

	constructor( args: Args ){
		super( args );
		this.action = "start";
	}

	execute( args: Args ): void{
		let serverManager = new ServerManager();
		if( args[ "attached" ] ){
			serverManager.initialize();
			serverManager.start();
		}else{
			serverManager.startDetached();
		}
	}

}