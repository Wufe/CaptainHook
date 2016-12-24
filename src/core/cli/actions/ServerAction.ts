/// <reference path="../../../../typings/index.d.ts" />

import * as Chalk from 'chalk';

import Action from './Action';
import {Environment, getEnvironment} from '../../chook';
import {ServerManager} from '../../net';

class ServerAction extends Action{

	args: {
		action: string;
		attached: boolean;
		quiet: boolean;
		gui: boolean;
	};

	environment: Environment;

	constructor(){
		super();
		this.environment = getEnvironment();
		this.actions = [ "start", "stop", "status" ];
	}

	run(): void{
		super.run();
		this.args = this.environment.get( 'args' );
		if( this.args[ 'action' ] == 'start' ){
			this.startServer();
		}else if( this.args[ 'action' ] == 'stop' ){
			this.stopServer();
		}else if( this.args[ 'action' ] == 'status' ){
			this.getServerStatus();
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

	getServerStatus(): void{
		let serverManager: ServerManager = new ServerManager();
		serverManager
			.isOnline()
			.then( ( online: boolean ) => {
				if( !online ){
					console.log( Chalk.red( `The server is not online.` ) );
				}else{
					console.log( Chalk.green( `The server is online.` ) );
				}
			});
	}

}

const server: ServerAction = new ServerAction();
export default server;