/// <reference path="../../../../typings/index.d.ts" />

import {Request, Response, NextFunction} from 'express';
import {red} from 'chalk';
import {Log} from '../../chook';
import Token from '../../auth/Token';
import {User} from '../../actors';

const checkAuth = ( redirect: boolean = false ) => {
	return ( request: Request & { [key: string]: any }, response: Response, next: NextFunction ) => {
		let {cookies} = request;
		let {jwt: token} = cookies;
		if( !token ){
			if( redirect ){
				response.redirect( 301, '/login' );
			}else{
				response.sendStatus( 401 );
			}
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
					Log( 'error', red( `Cannot authenticate user #${payload.issuer}.` ) );
					Log( 'error', red( error.message ), error );
					if( redirect ){
						response.redirect( 301, '/login' );
					}else{
						response.sendStatus( 401 );
					}
				});
		}catch( error ){
			if( redirect ){
				response.redirect( 301, '/login' );
			}else{
				response.sendStatus( 401 );
			}
		}
	};
}

export const auth = checkAuth( false );
export const redirectUnauthorized = checkAuth( true );