import {Request, Response, NextFunction} from 'express';
import {getResourcePath, getUrlPathname, VIEWS_PATH} from '..';
import {Utils} from '../../chook';
import {Renderer} from '../../gui';

export const serveAssets = ( request: any, response: any, next: any ) => {
	let urlPathname: string = getUrlPathname( request );
	let resourcePath: string = getResourcePath( urlPathname );
	if( Utils.isFile( resourcePath ) ){
		response.sendFile( resourcePath );
	}else{
		next();
	}
}

export const serveIndex = ( request: any, response: any, next: any ) => {
	let renderer: Renderer = new Renderer();
	let pageContent: string;
	try{
		let data: { [key: string]: any } = {
			css: [],
			javascript: [
				'/javascript/vendor.bundle.js',
				'/javascript/main.bundle.js'
			]
		};
		pageContent = renderer.compile( `${VIEWS_PATH}/index.html`, data );
	}catch( error ){
		response.status( 400 ).send( `Cannot get index.` );
	}
	response.status( 200 ).send( pageContent );
	
}