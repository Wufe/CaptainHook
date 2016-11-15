declare let require:any;
const Url = require( 'url' );
const Path = require( 'path' );

import {Configuration, Environment} from '../chook';
import Frontend from './Frontend';
import {Server} from '../net';

export default class GUIManager{

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
		let frontend: Frontend = new Frontend( this.server );
		frontend.setup();
	}

}