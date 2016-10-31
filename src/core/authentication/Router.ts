/// <reference path="../../../typings/globals/express/index.d.ts" />
/// <reference path="../../../typings/globals/express-serve-static-core/index.d.ts" />

import {RequestHandler} from 'express';
import Server from '../server/Server';

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
		return ( request, response, next ) => {
			next();
		};
	}

}