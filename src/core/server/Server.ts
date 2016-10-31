import * as Express from 'express';

export default class Server{

	expressServer: Express.Express;

	constructor(){
		this.expressServer = Express();
	}

	listen( port:number = 3000 ): void{
		this.expressServer.listen( port );
	}

}