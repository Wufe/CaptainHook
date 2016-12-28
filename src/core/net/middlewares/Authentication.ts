/// <reference path="../../../../typings/index.d.ts" />

import {Request, Response, NextFunction} from 'express';
import {red} from 'chalk';
import {Authentication, generateToken, getCookieMaxAge, Token} from '../../auth';
import {Log} from '../../chook';
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

const setResponseCookie = ( response: Response, user: User ) => {
	let token = generateToken( user );
	let maxAge: number = getCookieMaxAge();
	response.cookie( 'jwt', token, { maxAge: maxAge });
}

export const authenticate = ( request: Request, response: Response, next: NextFunction ) => {
	try{
		let {body} = request;
		if( !body )
			throw new Error( `Cannot find a body.` );
		let {username, password} = request.body;
		if( !username || !password )
			throw new Error( `Credentials not set.` );
		new Authentication({ username, password })
			.validateCredentials()
			.then( ( user: User ) => {
				Log( 'notice', `User ${user.get( 'username' )} authenticated.` );
				setResponseCookie( response, user );
				response.sendStatus( 200 );
			})
			.catch( ( error?: any) => {
				Log( 'warning', `Someone logged with wrong credentials.`, {
					username,
					password: '******'
				});
				if( error )
					Log( 'error', red( error.message ) );
				response.sendStatus( 401 );
			})
	}catch( e ){
		response.sendStatus( 400 );
	}
	
};