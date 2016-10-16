declare let require: any;
const Path = require( 'path' );
const Url = require( 'url' );

import Server from '../server/Server';
import Environment from '../chook/Environment';

const assetsDir: string = "/assets/";
const resourcesPath: string = Path.resolve( Path.join( Environment.buildDirectory, 'resources' ) );
const assetsPath: string = Path.join( resourcesPath, 'assets' );
const viewsPath: string = Path.join( resourcesPath, 'views' );

export default class Frontend{

	server: Server;

	constructor( server: Server ){
		this.server = server;
	}

}