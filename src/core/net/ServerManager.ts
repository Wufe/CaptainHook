/// <reference path="../../../typings/index.d.ts" />

import * as Path from 'path';
import * as Request from 'request';

import * as Authentication from '../auth';
import GUIManager from '../gui/GUIManager';
import {Configuration, Environment, Log, Process, ProcessManager} from '../chook';
import {Controller, Hmr, Server} from '.';

export default class ServerManager{

	serverInstance: Server;
	guiManager: GUIManager;
	authenticationRouter: Authentication.Router;

	constructor(){
		this.serverInstance = new Server();
	}

	initialize(): void{
		this.initializeHmr();
		this.initializeControlRoutes();
		this.initializeAuthentication();
		this.initializeGui();
	}

	initializeHmr(): void{
		let hmr: Hmr = new Hmr( this.serverInstance );
		hmr.setup();
	}

	initializeControlRoutes(): void{
		let controller: Controller = new Controller( this.serverInstance );
		controller.setup();
	}

	initializeAuthentication(): void{
		this.authenticationRouter = new Authentication.Router( this.serverInstance );
		this.authenticationRouter.setup();
	}

	initializeGui(): void{
		this.guiManager = new GUIManager( this.serverInstance );
		this.guiManager.setup();
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
			let processKilled: boolean = processManager.killProcess();
			if( processKilled ){
				processManager.deleteProcess();
				Log( 'info', 'Server stopped.' );
			}else{
				this.forceStop();
			}
		}else{
			this.forceStop();
		}
	}

	forceStop(): void{
		this.pingPid()
			.then( ( pidBody: string ) => {
				let pid: number = Number( pidBody );
				let processManager: ProcessManager = new ProcessManager({
					pid
				});
				let processKilled: boolean = processManager.killProcess();
				if( !processKilled ){
					Log( 'error', 'Cannot force-stop the server.' );
				}else{
					Log( 'info', 'Server stopped.' );
				}
			})
			.catch( error => {
				Log( 'error', 'Cannot force-stop the server.', error );
			});
	}

	pingPid(): Promise<string>{
		let server: {
			hostname: string;
			port: number;
		} = Configuration.get( 'server' );
		let token: string = Configuration.get( 'security', 'token' );
		return new Promise<string>( ( resolve, reject ) => {
			Request.post( `http://${server.hostname}:${server.port}/ping`, {
				timeout: 1000,
				json: {
					token
				}
			}, ( error: any, response: any, body: any ) => {
				if( error ){
					reject( new Error( `Request error.` ) );
				}else if( response.statusCode == 401 ){
					reject( new Error( `Wrong security token.` ) );
				}else if( response.statusCode != 200 ){
					reject( new Error( `Wrong response code.` ) );
				}else{
					resolve( body );
				}
			});
		});
	}

	isOnline(): Promise<boolean>{
		return new Promise<boolean>( ( resolve ) => {
			this.pingPid()
				.then(() => {
					resolve( true );
				})
				.catch(() => {
					resolve( false );
				});
		});
	}

}