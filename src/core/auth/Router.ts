/// <reference path="../../../typings/globals/express/index.d.ts" />
/// <reference path="../../../typings/globals/express-serve-static-core/index.d.ts" />

import {NextFunction, Request, RequestHandler, Response} from 'express';
import {Server} from '../net';

export default class Router{

	server: Server;

	constructor( server: Server ){
		this.server = server;
	}

	setup(): void{
		this.addAuthenticationRoutes();
	}

	addAuthenticationRoutes(): void{
		this.server.express.post( '/auth', this.getAuthenticationRouteHandler() );
	}

	getAuthenticationRouteHandler(): RequestHandler{
		return ( request: Request, response: Response, next: NextFunction ) => {
			try{
				this.checkCredentials( request );
				response.status( 200 ).send( 'OK' );
			}catch( error ){
				this.sendMalformedRequest( response, error.message );
			}
		};
	}

	sendMalformedRequest( response: any, message: string = `Malformed request.` ): void{
		response.status( 400 ).send( message );
	}

	checkCredentials( request: any ): void{
		let body: any = request.body;
		if( !body ){
			throw new Error( `Empty body.` );
		}
		let {username, password} = body;
		if( !username || !password ){
			throw new Error( `Malformed request.` );
		}
	}

}