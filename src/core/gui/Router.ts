import {Api, CommandManager} from '../chook';
import {Server} from '../net';
import {auth, serveAssets, serveIndex} from '../net/middlewares';

export const ROUTE_INDEX = '/';
export const ROUTE_LOGIN = '/login';
export const ROUTE_API = /\/api*/i;
export const ROUTE_ENTRY_CREATE = '/entry/create';

export default class Router{

	server: Server;
	commandManager: CommandManager;

	constructor( server: Server, commandManager: CommandManager ){
		this.server = server;
		this.commandManager = commandManager;
	}

	setup(){
		this.server.express.get( '*', serveAssets );
		this.server.express.get( ROUTE_INDEX, auth, serveIndex );
		this.server.express.get( ROUTE_ENTRY_CREATE, auth, serveIndex );
		this.server.express.get( ROUTE_LOGIN, serveIndex );
		this.server.express.all( ROUTE_API, auth );
		new Api( this.server, this.commandManager ).setup();
	}

}