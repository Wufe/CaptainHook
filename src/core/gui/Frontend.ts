declare let require: any;
const Path = require( 'path' );
const Url = require( 'url' );

import {Server} from '../net';
import FrontendRouter from './FrontendRouter';

export default class Frontend{

	server: Server;

	constructor( server: Server ){
		this.server = server;
	}

	setup(): void{
		this.setupFrontendRoutes();
	}

	setupFrontendRoutes(): void{
		let frontendRouter: FrontendRouter = new FrontendRouter( this.server );
	}

}