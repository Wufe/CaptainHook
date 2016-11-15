/// <reference path="../../../typings/index.d.ts" />

import {Configuration, Log} from '../chook';
import {NextFunction, Request, RequestHandler, Response} from 'express';
import {Server} from '.';

export default class Controller{

	server: Server;

	constructor( server: Server ){
		this.server = server;
		this.handlePing = this.handlePing.bind( this );
	}

	setup(): void{
		this.server.express.post( '/ping', this.handlePing );
	}

	handlePing( request: Request, response: Response, next: NextFunction ): void{
		let body: any = request.body;
		let securityToken: string = Configuration.get( 'security', 'token' );
		if( !body || !body.token || body.token != securityToken ){
			Log( 'warning', `Ping failed with token [${body.token}].` );
			this.sendUnauthorized( response );
		}else{
			Log( 'info', `Sent process id via ping request.` );
			response.status( 200 ).send( `${process.pid}` );
		}
	}

	sendUnauthorized( response: Response, message: string = `Unauthorized.` ): void{
		response.status( 401 ).send( message );
	}

}