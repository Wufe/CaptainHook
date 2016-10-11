import Server from './Server';
import GUIManager from '../gui/GUIManager';

export default class ServerManager{

	serverInstance: Server;

	constructor(){
		this.serverInstance = new Server();
	}

	initialize(): void{
		this.initializeGui();
	}

	initializeGui(): void{
		let gui: GUIManager = new GUIManager( this.serverInstance );
		gui.initialize();
	}

}