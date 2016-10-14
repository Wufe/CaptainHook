import Server from '../server/Server';
import * as Utils from '../chook/Utils';
declare let require:any;
const Url = require( 'url' );
const Path = require( 'path' );

/**
 * Here we are going to serve static files with no middleware,
 * to not require express' deps
 */ 

const assetsDir: string = "/assets/";
const assetsPath: string = Path.resolve( Path.join( '..', 'resources', 'assets' ) );

export default class GUIManager{

	serverInstance: Server;

	constructor( serverInstance: Server ){
		this.serverInstance = serverInstance;
	}

	initialize(): void{
		this.addAssetsRoutes();
	}

	addAssetsRoutes(): void{}

	serveAssets( request: any, response: any, next: any ): void{}

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

}