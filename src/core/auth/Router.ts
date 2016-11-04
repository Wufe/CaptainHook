/// <reference path="../../../typings/globals/express/index.d.ts" />
/// <reference path="../../../typings/globals/express-serve-static-core/index.d.ts" />

import {Authentication, Encryption, Token} from '.';
import {NextFunction, Request, RequestHandler, Response} from 'express';
import {Server} from '../net';
import {User} from '../actors';

export interface Credentials{
	username: string;
	password: string;
}

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
			let validBody: boolean = this.isBodyValid( request );
			if( !validBody ){
				this.sendMalformedRequest( response );
			}else{
				let credentials: Credentials = this.getCredentials( request );
				this.validateCredentials( credentials )
					.then( ( user: User ) => {
						response.status( 200 ).send( this.createToken( user ) );
					})
					.catch( error => {
						this.sendUnauthorized( response );
					});
			}
		};
	}

	sendMalformedRequest( response: Response, message: string = `Malformed request.` ): void{
		response.status( 400 ).send( message );
	}

	sendUnauthorized( response: Response, message: string = `Unauthorized.` ): void{
		response.status( 401 ).send( message );
	}

	isBodyValid( request: Request ): boolean{
		let credentials: Credentials = this.getCredentials( request );
		if( !credentials )
			return false;
		return true;
	}

	getCredentials( request: Request ): Credentials{
		let body: any = request.body;
		if( !body )
			return null;
		let {username, password} = body;
		if( !username || !password )
			return null;
		return {
			username,
			password
		};
	}

	validateCredentials( credentials: Credentials ): Promise<User>{
		let authentication: Authentication = new Authentication( credentials );
		return authentication.validateCredentials();
	}

	createToken( user: User ): string{
		let token: Token = new Token( user );
		return token.get();
	}

}