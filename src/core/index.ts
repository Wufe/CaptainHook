import Cli from './cli';
import {ServerManager} from './net';

import {Actor, Hook, User, Test} from './actors';
import {Encryption} from './auth';

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
	let user: User = new User( 'asd', 'admin' );
	user.save()
		.then( data => console.log( data ) )
		.catch( error => console.log( error ) );
}else if( args[ 2 ] === "create:test" ){
	let test: Test = new Test( 'test' );
	test.save()
		.then( data => console.log( data ) )
		.catch( error => console.log( error ) );
}