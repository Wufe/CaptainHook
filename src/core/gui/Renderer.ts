import * as Handlebars from 'handlebars';
const fs = require( 'fs' );

export default class Render{
	
	compile( filepath: string, data: any = {} ){
		let filecontent: string = fs.readFileSync( filepath, 'utf8' );
		let template: HandlebarsTemplateDelegate = Handlebars.compile( filecontent );
		let result: string = template( data );
		return result;
	}

}