import Cli from './cli';
import ServerManager from './server/ServerManager';

import {User} from './actors';
import {Encryption} from './authentication';

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
}else if( args[ 2 ] === "create:user" ){
	let encryption: Encryption = new Encryption( 'admin' );
	let user: User = new User( 'admin', 'admin' );
	user.save()
		.then(( data ) => {
			console.log( data );
		})
		.catch(( error: any ) => {
			console.log( error );
		})
}
