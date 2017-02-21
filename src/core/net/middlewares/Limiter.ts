/// <reference path="../../../../typings/index.d.ts" />

import {Request, Response, NextFunction} from 'express';
import {Log} from '../../chook';
const Limiter = require( 'limiter' ).RateLimiter;

let IPMap: {
	[key: string]: number;
} = {};

export const limiter = ( request: Request, response: Response, next: NextFunction ) => {
	const {ip} = request;
	let limiter: any = IPMap[ ip ];
	if( typeof limiter == 'undefined' ){
		IPMap[ ip ] = new Limiter( 3, 'minute', true );
		limiter = IPMap[ ip ];
	}
	limiter.removeTokens( 1, ( err: any, remainingRequests: number ) => {
		if( remainingRequests < 0 ){
			Log( "warning", `Too many requests from ${ip}.` );
			response.sendStatus( 429 );
		}else{
			next();
		}
	});
};