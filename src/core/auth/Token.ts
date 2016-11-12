/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../node_modules/@types/core-js/index.d.ts" />

import * as Moment from 'moment';
import * as Jwt from 'jsonwebtoken';
import {Configuration} from '../chook/';
import {User} from '../actors';

interface JWTSettings{
	secret: string;
	expiration_hours: number;
}

const jwtSettings: JWTSettings = Configuration.get( 'security', 'jwt' );

export default class Token{

	user: User;

	constructor( user?: User ){
		this.user = user;
	}

	get(): string{
		if( !jwtSettings.secret )
			throw new Error( `JWT secret not set.` );
		if( !this.user )
			throw new Error( `User not set.` );
		let token: string = Jwt.sign({
			iat: this.getActualDate(),
			exp: this.getExpirationDate(),
			issuer: this.getIssuer()
		}, jwtSettings.secret );
		return token;
	}

	getActualDate(): number{
		let unixMilliseconds: number = Moment().valueOf();
		let unixSeconds: number = Math.floor( unixMilliseconds / 1000 );
		return unixSeconds;
	}

	getExpirationDate(): number{
		let jwtExpirationHours: number = jwtSettings.expiration_hours;
		if( !jwtExpirationHours )
			throw new Error( `JWT expiration_hours not set.` );
		let unixMilliseconds: number = Moment().add( jwtExpirationHours, 'hour' ).valueOf();
		let unixSeconds: number = Math.floor( unixMilliseconds / 1000 );
		return unixSeconds;
	}

	getMaxAge(): number{
		return jwtSettings.expiration_hours * 60 * 60 * 1000;
	}

	getIssuer(): any{
		return this.user.get( 'id' );
	}

}