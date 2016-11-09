/// <reference path="../../../typings/index.d.ts" />

import * as Path from 'path';

import * as Authentication from '../auth';
import Configuration from '../Configuration';
import GUIManager from '../gui/GUIManager';
import {Environment, Log, Process, ProcessManager} from '../chook';
import {Server} from '.';

export default class ServerManager{

	serverInstance: Server;
	guiManager: GUIManager;
	authenticationRouter: Authentication.Router;

	constructor(){
		this.serverInstance = new Server();
	}

	initialize(): void{
		if( this.isGuiEnabled() ){
			this.initializeAuthentication();
			this.initializeGui();	
		}
	}

	isGuiEnabled(): boolean{
		return Environment.get( 'args', 'gui' ) || Configuration.get( 'gui' ) === true
	}

	initializeAuthentication(): void{
		this.authenticationRouter = this.createAuthenticationRouter();
		this.authenticationRouter.setup();
	}

	createAuthenticationRouter(): Authentication.Router{
		return new Authentication.Router( this.serverInstance );
	}

	initializeGui(): void{
		this.guiManager = this.createGuiManager();
		this.guiManager.setup();
	}

	createGuiManager(): GUIManager{
		return new GUIManager( this.serverInstance );
	}

	start(): void{
		this.serverInstance.listen();
	}

	startDetached(): void{
		let processArguments: string[] = [ 'start', '--attached' ];
		if( Environment.get( 'args', 'gui' ) )
			processArguments.push( '--gui' );
		if( Environment.get( 'args', 'quiet' ) )
			processArguments.push( '--quiet' );
		let processInfo: Process = {
			binary: Path.join( Environment.buildDirectory, 'bin', 'chook' ),
			arguments: processArguments
		};
		let processManager: ProcessManager = new ProcessManager( processInfo );
		processManager.spawnProcess();
		processManager.saveProcess();
		Log( 'info', 'Server started and saved.' );
	}

	stop(): void{
		let processManager: ProcessManager = ProcessManager.loadProcess();
		if( processManager ){
			processManager.killProcess();
			processManager.deleteProcess();	
			Log( 'info', 'Server stopped and deleted.' );
		}
	}

}