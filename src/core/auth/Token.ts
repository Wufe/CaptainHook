/// <reference path="../../../typings/index.d.ts" />

import * as Moment from 'moment';
import * as Jwt from 'jsonwebtoken';
import {JWTSettings} from '.';
import {Configuration} from '../chook/';
import {User} from '../actors';

export default class Token{

	user: User;
	jwtSettings: JWTSettings;

	constructor( user?: User ){
		this.user = user;
		this.jwtSettings = Configuration.get( 'security', 'jwt' );
	}

	get(): string{
		if( !this.jwtSettings.secret )
			throw new Error( `JWT secret not set.` );
		if( !this.user )
			throw new Error( `User not set.` );
		let token: string = Jwt.sign({
			iat: this.getActualDate(),
			exp: this.getExpirationDate(),
			issuer: this.getIssuer()
		}, this.jwtSettings.secret );
		return token;
	}

	getActualDate(): number{
		let unixMilliseconds: number = Moment().valueOf();
		let unixSeconds: number = Math.floor( unixMilliseconds / 1000 );
		return unixSeconds;
	}

	getExpirationDate(): number{
		let jwtExpirationHours: number = this.jwtSettings.expiration_hours;
		if( !jwtExpirationHours )
			throw new Error( `JWT expiration_hours not set.` );
		let unixMilliseconds: number = Moment().add( jwtExpirationHours, 'hour' ).valueOf();
		let unixSeconds: number = Math.floor( unixMilliseconds / 1000 );
		return unixSeconds;
	}

	getIssuer(): any{
		return this.user.get( 'id' );
	}

	static validate( jwt: string ): any{
		return Jwt.verify( jwt, (<JWTSettings>(Configuration.get( 'security', 'jwt' ))).secret );
	}

}