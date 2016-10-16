declare let require: any;
const Path = require( 'path' );
const Url = require( 'url' );

import Server from '../server/Server';
import Environment from '../chook/Environment';
import Renderer from './Renderer';
import * as Utils from '../chook/Utils';

const assetsDir: string = "/assets/";
const resourcesPath: string = Path.resolve( Path.join( Environment.buildDirectory, 'resources' ) );
const assetsPath: string = Path.join( resourcesPath, 'assets' );
const viewsPath: string = Path.join( resourcesPath, 'views' );

export default class FrontendRouter{

	server: Server;

	constructor( server: Server ){
		this.server = server;
		this.addFrontendRoutes();
	}

	addFrontendRoutes(): void{
		this.server.addRoute( 'all', '*', (request, response, next ) => {
			this.serveAssets( request, response, next );
		});	
		this.server.addRoute( 'get', '/', (request, response, next ) => {
			this.serveIndex( request, response, next );
		});
	}

	serveAssets( request: any, response: any, next: any ): void{
		let urlPathname: string = this.getUrlPathname( request );
		let isAssetsDir: boolean = this.isAssetsDir( urlPathname );
		if( isAssetsDir ){
			urlPathname = urlPathname.replace( assetsDir, "" );
			let resourcePath: string = this.getResourcePath( urlPathname );
			if( Utils.isFile( resourcePath ) ){
				this.sendFile( response, resourcePath );
			}else{
				this.sendNotFound( response, resourcePath );
			}
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
					'/assets/javascript/vendor.bundle.js',
					'/assets/javascript/main.bundle.js'
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