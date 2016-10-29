/// <reference path="../../../typings/globals/js-yaml/index.d.ts" />

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
		if( keys.length === 1 ){
			return this.getByKey( keys[0] );
		}else{
			return this.getByPath( keys );
		}
		
	}

	getByKey( key: string ): any{
		let value: any = this.configuration[ key ];
		return value;
	}

	getByPath( path: string[] ): any{
		let value: any = this.configuration;
		let i: number = 0;
		while( typeof value != 'undefined' && i < path.length ){
			value = value[ path[i++] ];
		}
		return value;
	}

	set( key: string, value: any ): void{
		this.configuration[ key ] = value;
		this.dumpConfiguration( this.configuration );
	}

}