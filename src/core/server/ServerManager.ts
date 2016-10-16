import Server from './Server';
import GUIManager from '../gui/GUIManager';

export default class ServerManager{

	serverInstance: Server;
	guiManager: GUIManager;

	constructor(){
		this.serverInstance = new Server();
	}

	initialize(): void{
		this.initializeGui();
	}

	initializeGui(): void{
		this.guiManager = this.createGuiManager();
		this.guiManager.setup();
	}

	createGuiManager(): GUIManager{
		return new GUIManager( this.serverInstance );
	}

}