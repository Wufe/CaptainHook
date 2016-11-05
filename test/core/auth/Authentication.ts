/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import {Authentication, Credentials} from '../../../src/core/auth';
import {User} from '../../../src/core/actors';

describe( `Authentication`, () => {
	let credentials: Credentials = {
		username: 'admin',
		password: 'admin'
	};
	let authentication: Authentication = new Authentication( credentials );
	describe( `validateCredentials`, () => {
		it( `should return a promise with a user value, containing the admin data`, ( done: ( error?: any ) => void ) => {
			let validation: Promise<User> = authentication.validateCredentials();
			Should( typeof validation ).not.be.equal( "undefined" );
			validation
				.then( ( user: User ) => {
					user.get().should.have.property( 'username' ).which.is.equal( 'admin' );
					done();
				})
				.catch( ( error: any ) => {
					done( error );
				});
		});
		it( `should catch a error if trying to login with empty password`, ( done: ( error?: any ) => void ) => {
			let emptyAuthentication: Authentication = new Authentication({
				username: credentials.username,
				password: null
			});
			let emptyValidation: Promise<User> = emptyAuthentication.validateCredentials();
			Should( typeof emptyValidation ).not.be.equal( "undefined" );
			emptyValidation
				.then( ( user: User ) => {
					done( new Error( `Validation should not work.` ) );
				})
				.catch( ( error: any ) => {
					done();
				});
		});
	});
});