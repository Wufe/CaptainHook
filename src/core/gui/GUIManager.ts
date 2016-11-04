declare let require:any;
const Url = require( 'url' );
const Path = require( 'path' );

import Frontend from './Frontend';
import {Server} from '../net';

export default class GUIManager{

	server: Server;

	constructor( server: Server ){
		this.server = server;
	}

	setup(): void{
		let frontend: Frontend = new Frontend( this.server );
		frontend.setup();
	}

}