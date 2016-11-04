/// <reference path="../../typings/index.d.ts" />

import Environment from './chook/Environment';
import * as Crypto from 'crypto';
import * as Utils from './chook/Utils';
import * as Yaml from 'js-yaml';

const Path = require( 'path' );
const Fs = require( 'fs' );

const configFileName: string = 'config.yml';

class Configuration{

	configurationPath: string;
	configuration: any;

	constructor(){
		let configurationFile: string = configFileName;
		if( process.env.NODE_ENV == 'mocha' ||
			process.env.NODE_ENV == 'circleci' ||
			process.env.NODE_ENV == 'test' ){
			configurationFile = 'test.config.yml';
		}
		this.configurationPath = Path.join( Environment.buildDirectory, 'resources', configurationFile );
		this.readConfiguration();
	}

	readConfiguration(): void{
		let fileContent: string = this.getFileContent( this.configurationPath );
		this.configuration = Yaml.safeLoad( fileContent );
	}

	getFileContent( filePath: string ): string{
		let fileContent: string;
		try{
			fileContent = Fs.readFileSync( filePath, 'utf8' );
		}catch( error ){
			this.generateDefaultConfiguration();
			fileContent = Fs.readFileSync( filePath, 'utf8' );
		}
		return fileContent;
	}

	dumpConfiguration( configurationObject: any ): void{
		Fs.writeFileSync( this.configurationPath, Yaml.safeDump( configurationObject ) );
	}

	generateDefaultConfiguration(): void{
		let defaultConfiguration: any = this.getDefaultConfiguration();
		this.dumpConfiguration( defaultConfiguration );
	}

	getDefaultConfiguration(): any{
		let jwtSecret: string = Crypto.randomBytes( 32 ).toString( 'hex' );
		let defaultConfiguration: any = {
			gui: false,
			server: {
				hostname: '0.0.0.0',
				port: 2555
			},
			security: {
				jwt: {
					secret: `${jwtSecret}`,
					expiration_hours: 1
				}
			}
		};
		return defaultConfiguration;
	}

	get( ...keys: string[] ): any{
		return Utils.getNestedValue( this.configuration, ...keys );
	}

	set( value: any, ...keys: string[] ): void{
		this.configuration = Utils.setNestedValue( this.configuration, value, ...keys );
		this.dumpConfiguration( this.configuration );
	}

}

const configuration: Configuration = new Configuration();
export default configuration;