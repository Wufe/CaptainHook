import * as Yaml from 'js-yaml';
const path = require( 'path' );
const fs = require( 'fs' );

export default class Configuration{

	configurationPath: string;
	configuration: any;

	constructor(){
		this.configurationPath = path.join( __dirname, "..", "..", "chook.config.yml" );
		this.readConfiguration();
	}

	getFileContent(): string{
		let fileContent: string;
		try{
			fileContent = fs.readFileSync( this.configurationPath, 'utf8' );
		}catch( error ){
			this.generateDefaultConfiguration();
			fileContent = fs.readFileSync( this.configurationPath, 'utf8' );
		}
		return fileContent;
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
		let fileContent: string = this.getFileContent();
		this.configuration = Yaml.safeLoad( fileContent );
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