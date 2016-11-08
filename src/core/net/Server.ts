import Configuration from '../Configuration';
import {Log} from '../chook';
import * as BodyParser from 'body-parser';
import * as Express from 'express';
import * as Http from 'http';

export default class Server{

	express: Express.Express;

	constructor(){
		this.express = Express();
		this.express.use( BodyParser.urlencoded({ extended: false }) );
		this.express.use( BodyParser.json() );
	}

	listen(): void{
		let server: {
			hostname: string;
			port: number;
		} = Configuration.get( 'server' );
		Log( 'info', `[${server.hostname}:${server.port}] Starting server..` );
		this.express.listen( server.port, server.hostname ).on( 'error', console.log );
	}

}