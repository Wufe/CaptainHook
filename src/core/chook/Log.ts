/// <reference path="../../../typings/index.d.ts" />

import Environment from './Environment';
import * as Utils from './Utils';

import * as Fs from 'fs';
import * as Path from 'path';
import * as Winston from 'winston';

const logDirectory = Path.join( Environment.buildDirectory, 'resources', 'log' );

export class Log{

	logger: Winston.LoggerInstance;
	directoryFound: boolean = false;

	constructor(){}

	setup(): void{
		this.log = this.log.bind( this );
		this.checkDirectory();
		this.createLogger();
	}

	checkDirectory(): void{
		try{
			let directoryExists: boolean = Utils.isDirectory( logDirectory );
			if( !directoryExists ){
				Fs.mkdirSync( logDirectory );
			}
			this.directoryFound = true;
		}catch( error ){
			this.directoryFound = false;
		}
	}

	createLogger(): void{
		let logger: Winston.LoggerInstance = new Winston.Logger({
			transports: this.getTransports()
		});
		this.logger = logger;
	}

	getTransports(): Winston.TransportInstance[]{
		let transports: Winston.TransportInstance[] = [];
		if( this.directoryFound ){
			transports.push(
				new Winston.transports.File({
					filename: Path.join( logDirectory, 'generic.log' )
				})
			);
		}
		if( Environment.debug ){
			transports.push(
				new Winston.transports.Console()
			);
		}
		return transports;
	}

	log( level: string, message: string, ...meta: any[] ): void{
		this.logger.log( level, message, meta );
	}

}

const logInstance: Log = new Log();
logInstance.setup();
const log: ( level: string, message: string, ...meta: any[] ) => void = logInstance.log;
export default log;