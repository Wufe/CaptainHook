/// <reference path="../../../typings/index.d.ts" />

import {Encryption} from '../../../src/core/authentication';

import * as Mocha from 'mocha';
import * as Should from 'should';

const password = 'plainText1234$_';

describe( 'Encryption', function(){
	let encryption = new Encryption( password );
	let hash = encryption.getHash();
	describe( 'getHash', function(){
		it( 'should produce an encrypted bcrypt hash', function(){
			hash.should.be.a.String;
		});
		it( 'should produce a hash with 60 characters', function(){
			let hashLength = hash.length;
			hashLength.should.be.exactly( 60 );
		});
		it( 'should produce different hashes with each iteration', function(){
			let secondHash = encryption.getHash();
			hash.should.be.not.equal( secondHash );
		});
	});

	describe( 'compare', function(){
		it( 'should return true if the password corresponds', function(){
			let comparation = encryption.compare( hash );
			comparation.should.be.exactly( true );
		})
		it( 'should return false if the password does not correspond', function(){
			let comparation = encryption.compare( `${hash}A` );
			comparation.should.be.exactly( false );
		});
		it( 'should return false if plain password is given', function(){
			let comparation = encryption.compare( password );
			comparation.should.be.exactly( false );
		});
	});
});