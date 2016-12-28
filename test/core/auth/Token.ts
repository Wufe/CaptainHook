/// <reference path="../../../typings/index.d.ts" />

const Chai = require( 'chai' );
import * as Should from 'should';
import {Token} from '../../../src/core/auth';

describe( 'Token', () => {
	describe( 'generation', () => {
		let mockUser: any = {
			get( key: string ){
				if( key == 'id' )
					return 99;
			}
		};
		let token = new Token( mockUser );
		let tokenString = token.get();
		it( 'should generate and validate a token', () => {
			Should( tokenString ).be.a.String;
			let validation: any = Token.validate( tokenString );
			Should( validation ).have.property( 'issuer' ).which.is.equal( 99 );
		});
		it( 'should reject a wrong token', () => {
			Chai.expect(() => { Token.validate( `` ); }).to.throw( 'jwt must be provided' );
			Chai.expect(() => { Token.validate( `123` ); }).to.throw( 'jwt malformed' );
			Chai.expect(() => { Token.validate( `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0ODI2ODY0MTksImV4cCI6MTQ4MjY5MDAxOSwiaXNzdWVyIjoxfQ.v89QVrgwBlrNvddMtc5NHk0xRGtTo2KaQJQtZd_dyAg` ); }).to.throw( 'invalid signature' );
		});
	});
});