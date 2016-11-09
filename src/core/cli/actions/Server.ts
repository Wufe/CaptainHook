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
		}else if( this.args[ 'action' ] == 'stop' ){
			this.stopServer();
		}
	}

	startServer(): void{
		let serverManager: ServerManager = new ServerManager();
		if( this.args.attached ){
			serverManager.initialize();
			serverManager.start();
		}else{
			serverManager.startDetached();
		}
	}

	stopServer(): void{
		let serverManager: ServerManager = new ServerManager();
		serverManager.stop();
	}

}

const server: Server = new Server();
export default server;