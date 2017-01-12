/// <reference path="../../../typings/index.d.ts" />

import {Environment, getEnvironment, getBuildDirectory} from './Environment';
import * as Utils from './Utils';

import * as Chalk from 'chalk';
import * as Moment from 'moment';

import * as Fs from 'fs';
import * as Path from 'path';

import {Logger, LoggerInstance, transports, TransportInstance} from 'winston';

const {Console, File} = transports;

type LogLevels = {
	[level: string]: number;
};

type LogColors = {
	[level: string]: string;
};

type LogLevelsType = "debug" | "info" | "notice" | "warning" | "error" | "crit" | "alert" | "emerg";

export class Log{

	logger: LoggerInstance;
	directoryFound: boolean = false;
	environment: Environment;
	logDirectory: string;

	constructor(){
		this.environment = getEnvironment();
		this.logDirectory = Path.join( this.environment.buildDirectory, 'resources', 'log' );
	}

	setup(): void{
		this.log = this.log.bind( this );
		this.getTimestamp = this.getTimestamp.bind( this );
		this.checkDirectory();
		this.createLogger();
	}

	checkDirectory(): void{
		try{
			let directoryExists: boolean = Utils.isDirectory( this.logDirectory );
			if( !directoryExists ){
				Fs.mkdirSync( this.logDirectory );
			}
			this.directoryFound = true;
		}catch( error ){
			this.directoryFound = false;
		}
	}

	createLogger(): void{
		let logger: LoggerInstance = new Logger({
			transports: this.getTransports(),
			levels: this.getSyslogLevels()
		});
		this.logger = logger;
	}

	getSyslogLevels(): LogLevels{
		return {
			emerg: 0,
			alert: 1,
			crit: 2,
			error: 3,
			warning: 4,
			notice: 5,
			info: 6,
			debug: 7
		};
	}

	getSyslogColors(): LogColors{
		return {
			emerg: 'red',
			alert: 'yellow',
			crit: 'red',
			error: 'red',
			warning: 'red',
			notice: 'yellow',
			info: 'green',
			debug: 'blue'
		};
	}

	getTransports(): TransportInstance[]{
		let transports: TransportInstance[] = [];
		if( this.directoryFound ){
			transports.push(
				new File({
					filename: Path.join( this.logDirectory, 'generic.log' )
				})
			);
		}
		let logLevel: string = this.isDebug() ? 'debug' : 'info';
		if( !this.isQuiet() ){
			transports.push(
				new Console({
					level: logLevel,
					prettyPrint: true,
					colorize: true,
					silent: this.isTest() ? true : false,
					timestamp: this.getTimestamp
				})
			);
		}
		return transports;
	}

	isTest(): boolean{
		return this.environment.test;
	}

	isQuiet(): boolean{
		let quiet: boolean = false;
		let argsQuiet: any = this.environment.get( 'args', 'quiet' );
		if( argsQuiet === undefined ){
			quiet = this.environment.quiet;
		}else{
			quiet = argsQuiet;
		}
		return quiet;
	}

	isDebug(): boolean{
		return this.environment.get( 'args', 'debug' ) ? true : false;
	}

	getTime(): string{
		return ( Moment() ).format( 'ddd, DD MMM YYYY - HH:mm:ss' );
	}

	getTimestamp(): string{
		return `[${ Chalk.grey( this.getTime() ) }]`;
	}

	log( level: LogLevelsType, message: string, ...meta: any[] ): void{
		this.logger.log( level, message, meta );
	}

}

const logInstance: Log = new Log();
logInstance.setup();
const log: ( level: LogLevelsType, message: string, ...meta: any[] ) => void = logInstance.log;
const logError = ( error: any ) => { log( "error", Chalk.red( error.message ) ); };
const logSuccess = ( message: string, ...meta: any[] ) => { log( "notice", message, ...meta ); };
export {
	logError,
	logInstance,
	logSuccess
};
export default log;