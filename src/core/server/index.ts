import * as Express from 'express';

export default class Server{

	expressServer: any;

	constructor(){
		this.expressServer = Express();
	}

	addRoute( method: string, uri: string, callback: (request:any, response:any, next?: any) => void ): void{
		this.validateMethod( method );
		this.expressServer[ method ]( uri, callback );
	}

	validateMethod( method: string ): boolean{
		let isValidMethod: boolean = [ 'get', 'post', 'patch', 'put', 'delete', 'all' ].indexOf( method ) != -1;
		if( !isValidMethod )
			throw new TypeError( "Not a valid method." );
		return true;
	}

	listen( port:number = 3000 ): void{
		this.expressServer.listen( port );
	}

}