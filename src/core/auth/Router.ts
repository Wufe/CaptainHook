/// <reference path="../../../typings/globals/express/index.d.ts" />
/// <reference path="../../../typings/globals/express-serve-static-core/index.d.ts" />

import {Authentication, Encryption, Token} from '.';
import {Configuration, getEnvironment, Environment, Log} from '../chook';
import {NextFunction, Request, RequestHandler, Response} from 'express';
import {Server} from '../net';
import {authenticate} from '../net/middlewares';
import {User} from '../actors';

export interface Credentials{
	username: string;
	password: string;
}

export default class Router{

	server: Server;
	environment: Environment;

	constructor( server: Server ){
		this.server = server;
		this.environment = getEnvironment();
	}

	isGuiEnabled(): boolean{
		return this.environment.get( 'args', 'gui' ) || Configuration.get( 'gui' );
	}

	setup(): void{
		if( !this.isGuiEnabled() )
			return;
		this.addAuthenticationRoutes();
	}

	addAuthenticationRoutes(): void{
		this.server.express.post( '/auth', authenticate );
	}
}