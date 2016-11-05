/// <reference path="../../../typings/index.d.ts" />

import {Credentials, Encryption, Token} from '.';
import {Response} from 'express';
import {User} from '../actors';

export default class Authentication{

	credentials: Credentials;
	
	constructor( credentials?: Credentials ){
		this.credentials = credentials;
	}

	validateCredentials(): Promise<User>{
		return new Promise<User>( ( resolve, reject ) => {
			User.find.one({
				where: {
					username: this.credentials.username
				}
			})
			.then( ( user: User ) => {
				let isPasswordValid: boolean = this.validatePassword( user.get( 'password' ), this.credentials.password );
				if( !isPasswordValid ){
					reject();
				}else{
					resolve( user );
				}
			})
			.catch( ( error: any ) => {
				reject( error );
			});
		});
	}

	validatePassword( hashedPassword: string, plainPassword: string ): boolean{
		let encryption: Encryption = new Encryption( plainPassword );
		return encryption.compare( hashedPassword );
	}

}