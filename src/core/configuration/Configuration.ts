/// <reference path="../../../typings/globals/js-yaml/index.d.ts" />

import * as Utils from '../chook/Utils';
import * as Yaml from 'js-yaml';

const Path = require( 'path' );
const Fs = require( 'fs' );

export default class Configuration{

	configurationPath: string;
	configuration: any;

	constructor(){
		this.configurationPath = Path.resolve( "./chook.config.yml" );
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
		let defaultConfiguration: any = {
			gui: false
		};
		return defaultConfiguration;
	}

	get( ...keys: string[] ): any{
		return Utils.getNestedValue( this.configuration, ...keys );
	}

	set( key: string, value: any ): void{
		this.configuration[ key ] = value;
		this.dumpConfiguration( this.configuration );
	}

}