/// <reference path="../../../typings/index.d.ts" />

import Environment from './Environment';
import * as Utils from './Utils';

import * as Chalk from 'chalk';
import * as Moment from 'moment';

import * as Fs from 'fs';
import * as Path from 'path';
import {Logger, LoggerInstance, transports, TransportInstance} from 'winston';

const {Console, File} = transports;
const logDirectory = Path.join( Environment.buildDirectory, 'resources', 'log' );

export class Log{

	logger: LoggerInstance;
	directoryFound: boolean = false;

	constructor(){}

	setup(): void{
		this.log = this.log.bind( this );
		this.getTimestamp = this.getTimestamp.bind( this );
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
		let logger: LoggerInstance = new Logger({
			transports: this.getTransports()
		});
		this.logger = logger;
	}

	getTransports(): TransportInstance[]{
		let transports: TransportInstance[] = [];
		if( this.directoryFound ){
			transports.push(
				new File({
					filename: Path.join( logDirectory, 'generic.log' )
				})
			);
		}
		if( !this.isQuiet() ){
			transports.push(
				new Console({
					level: 'debug',
					prettyPrint: true,
					colorize: true,
					timestamp: this.getTimestamp
				})
			);
		}
		return transports;
	}

	isQuiet(): boolean{
		let quiet: boolean = false;
		let argsQuiet: any = Environment.get( 'args', 'quiet' );
		if( argsQuiet === undefined ){
			quiet = Environment.quiet;
		}else{
			quiet = argsQuiet;
		}
		return quiet;
	}

	getTime(): string{
		return ( Moment() ).format( 'ddd, DD MMM YYYY - HH:mm:ss' );
	}

	getTimestamp(): string{
		return `[${ Chalk.grey( this.getTime() ) }]`;
	}

	log( level: string, message: string, ...meta: any[] ): void{
		this.logger.log( level, message, meta );
	}

}

const logInstance: Log = new Log();
logInstance.setup();
const log: ( level: string, message: string, ...meta: any[] ) => void = logInstance.log;
export default log;