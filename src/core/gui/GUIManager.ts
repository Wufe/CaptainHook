declare let require:any;
const Url = require( 'url' );
const Path = require( 'path' );

import {CommandManager, Configuration, Environment, getEnvironment} from '../chook';
import {Router} from '.';
import {Server} from '../net';

export default class GUIManager{

	server: Server;
	commandManager: CommandManager;
	environment: Environment;

	constructor( server: Server, commandManager: CommandManager ){
		this.server = server;
		this.commandManager = commandManager;
		this.environment = getEnvironment();
	}

	isGuiEnabled(): boolean{
		return this.environment.get( 'args', 'gui' ) || Configuration.get( 'gui' );
	}

	setup(): void{
		if( !this.isGuiEnabled() )
			return;
		new Router( this.server, this.commandManager ).setup();
	}

}