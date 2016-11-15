/// <reference path="../../../typings/globals/express/index.d.ts" />
/// <reference path="../../../typings/globals/express-serve-static-core/index.d.ts" />

import {Authentication, Encryption, Token} from '.';
import {Configuration, Environment, Log} from '../chook';
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

	isGuiEnabled(): boolean{
		return Environment.get( 'args', 'gui' ) || Configuration.get( 'gui' );
	}

	setup(): void{
		if( !this.isGuiEnabled() )
			return;
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
						Log( 'info', `User ${user.get( 'username' )} authenticated.` );
						this.sendAuthenticated( response, user );
					})
					.catch( ( error?: any ) => {
						let logCredentials: Credentials = credentials;
						logCredentials.password = '*******';
						Log( 'warning', `Someone logged with wrong credentials.`, logCredentials );
						if( error )
							Log( 'error', error.message );
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

	sendAuthenticated( response: Response, user: User, message: string = `OK` ): void{
		response = this.setResponseCookie( response, user );
		response.status( 200 ).send( message );
	}

	setResponseCookie( response: Response, user: User ): Response{
		let jwt: Token = this.createJwt( user );
		let token: string = jwt.get();
		let maxAge: number = jwt.getMaxAge();
		return response.cookie( 'jwt', token, {
			maxAge: maxAge
		});
	}

	createJwt( user: User ): Token{
		let token: Token = new Token( user );
		return token;
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

}