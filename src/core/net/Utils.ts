import {Request} from 'express';
import {join, resolve} from 'path';
import {parse} from 'url';
import {getBuildDirectory} from '../chook';

export const ASSETS_DIR = "/assets/";
export const RESOURCE_PATH = resolve( join( getBuildDirectory(), 'resources' ) );
export const ASSETS_PATH = join( RESOURCE_PATH, 'assets' );
export const VIEWS_PATH = join( RESOURCE_PATH, 'views' );

export const getUrlPathname = ( request: Request ) => {
	let url = parse( request.url, true );
	let urlPathname: string = url.pathname;
	return urlPathname;
}

export const getResourcePath = ( pathname: string ) => {
	return join( ASSETS_PATH, pathname );
}