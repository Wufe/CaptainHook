import Action from './Action';

import {Environment} from '../../chook';
import {ServerManager} from '../../net';

class Server extends Action{

	args: {
		action: string;
		attached: boolean;
		quiet: boolean;
		gui: boolean;
	};

	constructor(){
		super();
		this.actions = [ "start", "stop", "status" ];
	}

	run(): void{
		super.run();
		this.args = Environment.get( 'args' );
		if( this.args[ 'action' ] == 'start' ){
			this.startServer();
		}
	}

	startServer(): void{
		if( this.args.attached ){
			let serverManager: ServerManager = new ServerManager();
			serverManager.initialize();
			serverManager.start();
		}
	}

}

const server: Server = new Server();
export default server;