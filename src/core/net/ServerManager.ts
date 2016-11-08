import * as Authentication from '../auth';
import Configuration from '../Configuration';
import GUIManager from '../gui/GUIManager';
import {Log} from '../chook';
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
		return Configuration.get( 'gui' ) === true
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

}