/// <reference path="../../../typings/globals/express/index.d.ts" />
/// <reference path="../../../typings/globals/express-serve-static-core/index.d.ts" />

import {Encryption} from '.';
import {NextFunction, Request, RequestHandler, Response} from 'express';
import {Server} from '../net';
import {User} from '../actors';

interface Credentials{
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
						response.status( 200 ).send( user.get( 'username' ) );
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
		return new Promise<User>( ( resolve, reject ) => {
			User.find.one({
				where: {
					username: credentials.username
				}
			})
			.then( ( user: User ) => {
				let isPasswordValid: boolean = this.validatePassword( user.get( 'password' ), credentials.password );
				if( !isPasswordValid ){
					reject();
				}else{
					resolve( user );
				}
			})
			.catch( ( error: any ) => {
				reject( error );
			});
		});
	}

	validatePassword( hashedPassword: string, plainPassword: string ): boolean{
		let encryption: Encryption = new Encryption( plainPassword );
		return encryption.compare( hashedPassword );
	}

}