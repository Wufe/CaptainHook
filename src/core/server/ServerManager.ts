import * as Authentication from '../authentication';
import Configuration from '../configuration/Configuration';
import GUIManager from '../gui/GUIManager';
import Server from './Server';

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

}