import * as Yaml from 'js-yaml';
const path = require( 'path' );
const fs = require( 'fs' );

export default class Configuration{

	configurationPath: string;
	configuration: any;

	constructor(){
		this.configurationPath = path.resolve( "./chook.config.yml" );
		this.readConfiguration();
	}

	dumpConfiguration( configurationObject: any ): void{
		fs.writeFileSync( this.configurationPath, Yaml.safeDump( configurationObject ) );
	}

	generateDefaultConfiguration(): void{
		let defaultConfiguration: any = {
			gui: false
		};
		this.dumpConfiguration( defaultConfiguration );
	}

	readConfiguration(): void{
		let fileContent: string = this.getFileContent( this.configurationPath );
		this.configuration = Yaml.safeLoad( fileContent );
	}

	getFileContent( filePath: string ): string{
		let fileContent: string;
		try{
			fileContent = fs.readFileSync( filePath, 'utf8' );
		}catch( error ){
			this.generateDefaultConfiguration();
			fileContent = fs.readFileSync( filePath, 'utf8' );
		}
		return fileContent;
	}

	get( key: string ): any{
		let value: any = this.configuration[ key ];
		return value;
	}

	set( key: string, value: any ): void{
		this.configuration[ key ] = value;
		this.dumpConfiguration( this.configuration );
	}

}