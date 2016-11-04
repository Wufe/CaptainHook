/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../node_modules/@types/core-js/index.d.ts" />

import * as Moment from 'moment';
import * as Jwt from 'jsonwebtoken';
import Configuration from '../Configuration';
import {User} from '../actors';

const jwtSecret: string = Configuration.get( 'security', 'jwt', 'secret' );

export default class Token{

	user: User;

	constructor( user?: User ){
		this.user = user;
	}

	get(): string{
		if( !jwtSecret )
			throw new Error( `JWT secret not set.` );
		if( !this.user )
			throw new Error( `User not set.` );
		let token: string = Jwt.sign({
			iat: this.getActualDate(),
			exp: this.getExpirationDate(),
			issuer: this.getIssuer()
		}, jwtSecret );
		return token;
	}

	getActualDate(): number{
		let unixMilliseconds: number = Moment().valueOf();
		let unixSeconds: number = Math.floor( unixMilliseconds / 1000 );
		return unixSeconds;
	}

	getExpirationDate(): number{
		let jwtExpirationHours: number = Configuration.get( 'security', 'jwt', 'expiration_hours' );
		let unixMilliseconds: number = Moment().add( jwtExpirationHours, 'hour' ).valueOf();
		let unixSeconds: number = Math.floor( unixMilliseconds / 1000 );
		return unixSeconds;
	}

	getIssuer(): any{
		return this.user.get( 'id' );
	}

}