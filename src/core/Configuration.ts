/// <reference path="../../typings/index.d.ts" />

import Environment from './chook/Environment';
import Log from './chook/Log';

import * as Crypto from 'crypto';
import * as Fs from 'fs';
import * as Path from 'path';
import * as Utils from './chook/Utils';
import * as Yaml from 'js-yaml';

const configurationFilename: string = 'config.yml';

export interface ConfigurationType{
	store: "memory" | "file";
	filename: string;
	directory: string;
	filepath: string;
	content: any;
}

export class Configuration{

	configurationPath: string;
	configuration: ConfigurationType = {
		store: "file",
		filename: null,
		directory: null,
		filepath: null,
		content: null
	};

	constructor(){}

	setup(): void{
		this.loadFile();
		this.checkStore();
		this.readConfiguration();
	}

	loadFile(): void{
		let isTestEnvironment: boolean =
			process.env.NODE_ENV == 'mocha' ||
			process.env.NODE_ENV == 'circleci' ||
			process.env.NODE_ENV == 'test';

		this.configuration.filename = isTestEnvironment ? `test.${configurationFilename}` : configurationFilename;
		this.configuration.directory = Path.join( Environment.buildDirectory, 'resources' );
		this.configuration.filepath = Path.join( this.configuration.directory, this.configuration.filename );
		this.configuration.content = {};
	}

	checkStore(): void{
		let isDirectoryReady: boolean = this.checkDirectory();
		if( !isDirectoryReady ){
			this.configuration.store = "memory";
			return;
		}
		let isFileReady: boolean = this.checkFile();
		if( !isFileReady )
			this.configuration.store = "memory";
	}

	checkDirectory(): boolean{
		let directoryExists: boolean = Utils.isDirectory( this.configuration.directory );
		if( !directoryExists ){
			Log( 'warn', `Cannot find configuration directory.` );
			try{
				Fs.mkdirSync( this.configuration.directory );
				Log( 'info', `Configuration directory created.` );
				return true;
			}catch( error ){
				Log( 'error', `Cannot create configuration directory.`, this.configuration, error );
				return false;
			}
		}
		return true;
	}

	checkFile(): boolean{
		let fileExists: boolean = Utils.isFile( this.configuration.filepath );
		if( !fileExists ){
			Log( 'warn', `Cannot find configuration file.` );
			let writeSucceded: boolean = this.dumpConfiguration( this.getDefaultConfiguration() );
			if( !writeSucceded ){
				Log( 'error', `Cannot create configuration file.`, this.configuration );
				return false;
			}else{
				Log( 'info', `Configuration file created.` );
				return true;
			}
		}
		return true;
	}

	readConfiguration(): void{
		let fileContent: string = this.getFileContent( this.configuration.filepath );
		if( !fileContent ){
			this.configuration.content = this.getDefaultConfiguration();
		}else{
			this.configuration.content = Yaml.safeLoad( fileContent );
		}
	}

	getFileContent( filepath: string ): string{
		if( this.configuration.store == "file" ){
			try{
				let content: string = Fs.readFileSync( filepath, 'utf8' );
				return content;
			}catch( error ){
				Log( 'error', `Cannot read from configuration file.`, this.configuration, error );
				return null;
			}
		}
		return null;
	}

	dumpConfiguration( configurationObject: any ): boolean{
		if( this.configuration.store == "file" ){
			try{
				Fs.writeFileSync( this.configuration.filepath, Yaml.safeDump( configurationObject ) );
				Log( 'silly', `Configuration updated.` );
				return true;
			}catch( error ){
				Log( 'error', `Cannot write configuration.`, this.configuration, error );
				return false;
			}
		}
		return false;
	}

	getDefaultConfiguration(): any{
		let jwtSecret: string = Crypto.randomBytes( 32 ).toString( 'hex' );
		let securityToken: string = Crypto.randomBytes( 32 ).toString( 'hex' );
		let defaultConfiguration: any = {
			gui: false,
			debug: false,
			server: {
				hostname: '0.0.0.0',
				port: 2555
			},
			security: {
				jwt: {
					secret: `${jwtSecret}`,
					expiration_hours: 1
				},
				token: `${securityToken}`
			}
		};
		return defaultConfiguration;
	}

	get( ...keys: string[] ): any{
		return Utils.getNestedValue( this.configuration.content, ...keys );
	}

	set( value: any, ...keys: string[] ): void{
		this.configuration.content = Utils.setNestedValue( this.configuration.content, value, ...keys );
		this.dumpConfiguration( this.configuration.content );
	}

}

const configuration: Configuration = new Configuration();
configuration.setup();
export default configuration;