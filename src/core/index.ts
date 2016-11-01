import Cli from './cli';
import ServerManager from './server/ServerManager';

export {
	Cli,
	ServerManager
};

/* Sample code */

let args: string[] = process.argv;
if( args[ 2 ] === "start:server" ){
	let serverManager: ServerManager = new ServerManager();
	serverManager.initialize();
	console.log( `Starting server..` );
	serverManager.serverInstance.listen();
}
