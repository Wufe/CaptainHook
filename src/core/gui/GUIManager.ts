import Server from '../server/Server';

export default class GUIManager{

	serverInstance: Server;

	constructor( serverInstance: Server ){
		this.serverInstance = serverInstance;
	}

	initialize(): void{

	}

}