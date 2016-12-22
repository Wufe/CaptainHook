/// <reference path="../../../../typings/index.d.ts" />

import {Request, Response, NextFunction} from 'express';
import {red} from 'chalk';
import {Log} from '../../chook';
import Token from '../../auth/Token';
import {User} from '../../actors';

export const auth = ( request: Request & { [key: string]: any }, response: Response, next: NextFunction ) => {
	let {cookies} = request;
	let {jwt: token} = cookies;
	if( !token ){
		response.redirect( 301, '/login' );
		return;
	}
	try{
		const payload = Token.validate( token );
		User.find.byId( payload.issuer )
			.then( ( user: User ) => {
				request[ 'user' ] = user;
				next();
			})
			.catch( ( error: any ) => {
				Log( 'error', red( error.message ), error );
				next();
			});
	}catch( error ){
		response.redirect( 301, '/login' );
	}
};