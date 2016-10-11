import Server from './Server';

export default class ServerManager{

	serverInstance: Server;

	constructor(){
		this.serverInstance = new Server();
	}

	initialize(): void{
		this.initializeGui();
	}

	initializeGui(): void{
		
	}

}