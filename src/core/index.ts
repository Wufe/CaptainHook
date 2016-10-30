import Cli from './cli';
import Configuration from './configuration/Configuration';
import EntryManager from './chook/EntryManager';
import Environment from './chook/Environment';
import FrontendRouter from './gui/FrontendRouter';
import Server from './server/Server';
import ServerManager from './server/ServerManager';
import * as Utils from './chook/Utils';

export {
	Cli,
	Configuration,
	EntryManager,
	Environment,
	FrontendRouter,
	Server,
	ServerManager,
	Utils
};

/* Sample code */

let args: string[] = process.argv;
if( args[ 2 ] === "start:server" ){
	let serverManager: ServerManager = new ServerManager();
	serverManager.initialize();
	console.log( `Starting server..` );
	serverManager.serverInstance.listen();
}
