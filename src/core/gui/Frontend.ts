declare let require: any;
const Path = require( 'path' );
const Url = require( 'url' );

import {Server} from '../net';
import FrontendRouter from './FrontendRouter';
import {CommandManager} from '../chook';

export default class Frontend{

	server: Server;
	commandManager: CommandManager

	constructor( server: Server, commandManager: CommandManager ){
		this.server = server;
		this.commandManager = commandManager;
	}

	setup(): void{
		this.setupFrontendRoutes();
	}

	setupFrontendRoutes(): void{
		let frontendRouter: FrontendRouter = new FrontendRouter( this.server, this.commandManager );
	}

}