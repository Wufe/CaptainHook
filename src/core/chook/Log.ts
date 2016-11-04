/// <reference path="../../../typings/index.d.ts" />

import Environment from './Environment';
import * as Utils from './Utils';

import * as Fs from 'fs';
import * as Path from 'path';
import * as Winston from 'winston';

const logDirectory = Path.join( Environment.buildDirectory, 'resources', 'log' );

export class Log{

	logger: Winston.LoggerInstance;

	constructor(){}

	setup(): void{
		this.checkDirectory();
		this.createLogger();
	}

	checkDirectory(): void{
		let directoryExists: boolean = Utils.isDirectory( logDirectory );
		if( !directoryExists ){
			Fs.mkdirSync( logDirectory );
		}
	}

	createLogger(): void{
		let logger: Winston.LoggerInstance = new Winston.Logger();
		
	}

}

const log: Log = new Log();
log.setup();
export default log;

// transports: [
//       new (winston.transports.Console)(),
//       new (winston.transports.File)({ filename: 'somefile.log' })
//     ]