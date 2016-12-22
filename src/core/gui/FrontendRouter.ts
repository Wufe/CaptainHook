declare let require: any;
const Path = require( 'path' );
const Url = require( 'url' );

import {auth, Server} from '../net';
import Environment from '../chook/Environment';
import Token from '../auth/Token';
import Renderer from './Renderer';
import * as Utils from '../chook/Utils';
import {Request, Response, NextFunction} from 'express';
import {Api, CommandManager} from '../chook';

const assetsDir: string = "/assets/";
const resourcesPath: string = Path.resolve( Path.join( Environment.buildDirectory, 'resources' ) );
const assetsPath: string = Path.join( resourcesPath, 'assets' );
const viewsPath: string = Path.join( resourcesPath, 'views' );

export default class FrontendRouter{

	server: Server;

	constructor( server: Server, commandManager: CommandManager ){
		this.server = server;
		this.addFrontendRoutes();
		this.addApiRoutes( commandManager );
	}

	addApiRoutes( commandManager: CommandManager ): void{
		new Api( this.server, commandManager ).setup();
	}

	addFrontendRoutes(): void{
		this.server.express.all( '*', ( request, response, next ) => {
			this.serveAssets( request, response, next );
		});	
		this.server.express.get( '/login', ( request, response, next ) => {
			this.serveIndex( request, response, next );
		});
		this.server.express.get( '/', auth, ( request, response, next ) => {
			this.serveIndex( request, response, next );
		});
		this.server.express.all( /api\/*/i, auth );
	}

	isAuthenticated( request: Request ): boolean{
		let {cookies} = request;
		let {jwt: token} = cookies;
		if( !token )
			return false;
		try{
			Token.validate( token );
			return true;
		}catch( error ){
			return false;
		}
	}

	serveAssets( request: any, response: any, next: any ): void{
		let urlPathname: string = this.getUrlPathname( request );
		let resourcePath: string = this.getResourcePath( urlPathname );
		if( Utils.isFile( resourcePath ) ){
			this.sendFile( response, resourcePath );
		}else{
			next();
		}
	}

	getUrlPathname( request: any ): string{
		let url: any = Url.parse( request.url, true );
		let urlPathname: string = url.pathname;
		return urlPathname;
	}

	isAssetsDir( pathname: string ): boolean{
		let startingWithAssetsDir: any = pathname.match( new RegExp( `^${assetsDir}` ) );
		if( startingWithAssetsDir === null )
			return false;
		return true;
	}

	getResourcePath( pathname: string ): string{
		return Path.join( assetsPath, pathname );
	}

	sendFile( response: any, resource: string ): void{
		response.sendFile( resource );
	}

	sendNotFound( response: any, resource: string ): void{
		response.status( 404 ).send( `Cannot find ${resource}.` );
	}

	serveIndex( request: any, response: any, next: any ): void{
		let renderer: Renderer = this.getRenderer();
		let pageContent: string;
		try{
			let data: any = {
				css: [],
				javascript: [
					'/javascript/vendor.bundle.js',
					'/javascript/main.bundle.js'
				]
			};
			pageContent = renderer.compile( `${viewsPath}/index.html`, data );
		}catch( error ){
			response.status( 400 ).send( `Cannot get index.` );
		}
		response.status( 200 ).send( pageContent );
		
	}

	getRenderer(): Renderer{
		return new Renderer();
	}

}