import * as Yaml from 'js-yaml';
const path = require( 'path' );

export default class Configuration{

	configurationPath: string;

	constructor(){
		this.configurationPath = path.join( __dirname, "..", "..", "chook.config.yml" );
	}

}