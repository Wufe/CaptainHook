/// <reference path="../../typings/index.d.ts" />

import * as Should from 'should';
import {internet} from 'faker';
const uuid = require( 'uuid/v1' );

import {Authentication, Credentials} from '../../src/core/auth';
import {User} from '../../src/core/actors';

describe( 'Authentication', () => {
	let credentials: Credentials = {
		username: 'admin',
		password: 'admin'
	};
	let authentication: Authentication = new Authentication( credentials );
	describe( `validateCredentials`, () => {
		it( 'should return a promise with a user value, containing the admin data', ( done: ( error?: any ) => void ) => {
			let validation = authentication.validateCredentials();
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
		it( `should catch a error if trying to login with wrong password`, ( done: ( error?: any ) => void ) => {
			let wrongAuthentication: Authentication = new Authentication({
				username: credentials.username,
				password: 'admo'
			});
			let wrongValidation = wrongAuthentication.validateCredentials();
			Should( typeof wrongValidation ).not.be.equal( "undefined" );
			wrongValidation
				.then( ( user: User ) => {
					done( new Error( `Validation should not work.` ) );
				})
				.catch( ( error: any ) => {
					done();
				});
		});
	});
	describe( `Test Account Creation`, () => {
		let credentials = {
			username: internet.userName() + uuid(),
			password: internet.password( 20, true )
		};
		let {username, password} = credentials;
		describe( `${username} ${password}`, () => {
			let user = new User({
				username,
				password
			});
			it( 'should have the same credentials set', () => {
				Should( user.get( 'username' ) ).be.equal( username );
				Should( user.get( 'password' ) ).be.equal( password );
			});
			it( 'should save the user', ( done: ( error?: any ) => void ) => {
				user.save()
					.then( () => {
						done();
					})
					.catch( ( error: any ) => {
						done( error );
					});
			});
			describe( `user's id`, () => {
				let id: number;
				before( () => {
					id = user.get( 'id' );
				});
				it( `should be valid`, () => {
					Should( typeof id ).not.be.equal( "undefined" );
				});
			});
			describe( `user's password`, () => {
				it( 'should not be plain', () => {
					Should( user.get( 'password' ) ).not.be.equal( password );
				});
			});
			describe( `Authentication Actions`, () => {
				it( 'should not be able to login with wrong password', ( done: ( error?: any ) => void ) => {
					let auth = new Authentication({ username, password: internet.password( 21, true ) });
					auth.validateCredentials()
						.then( () => {
							done( `Wrong password used.` );
						})
						.catch( ( error: any ) => {
							done();
						});
				});
				it( 'should not be able to login with wrong username', ( done: ( error?: any ) => void ) => {
					let auth = new Authentication({ username: internet.userName() + uuid(), password });
					auth.validateCredentials()
						.then( () => {
							done( `Wrong username used` );
						})
						.catch( ( error: any ) => {
							done();
						});
				});
				it( 'should be able to login with corret username and password', ( done: ( error?: any ) => void ) => {
					let auth = new Authentication({ username, password });
					auth.validateCredentials()
						.then( () => {
							done();
						})
						.catch( ( error: any ) => {
							done( error );
						});
				});
			});
		});
	});
})