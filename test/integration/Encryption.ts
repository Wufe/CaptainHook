/// <reference path="../../typings/index.d.ts" />

import {Encryption} from '../../src/core/auth';

import * as Should from 'should';

const password = 'plainText1234$_';

describe( 'Encryption', function(){
	let encryption = new Encryption( password );
	let hash = encryption.getHash();
	describe( 'getHash', function(){
		it( 'should produce an encrypted bcrypt hash', function(){
			Should( hash ).be.a.String;
		});
		it( 'should produce a hash with 60 characters', function(){
			let hashLength = hash.length;
			Should( hashLength ).be.equal( 60 );
		});
		it( 'should produce different hashes with each iteration', function(){
			let secondHash = encryption.getHash();
			Should( hash ).be.not.equal( secondHash );
		});
		it( `should return the hash, if it is already calculated`, () => {
			let alreadyEncrypted: Encryption = new Encryption( hash );
			Should( alreadyEncrypted.getHash() ).be.equal( hash );
		});
	});

	describe( 'compare', function(){
		it( 'should return true if the password corresponds', function(){
			let comparation = encryption.compare( hash );
			Should( comparation ).be.equal( true );
		})
		it( 'should return false if the password does not correspond', function(){
			let comparation = encryption.compare( `${hash}A` );
			Should( comparation ).be.equal( false );
		});
		it( 'should return false if plain password is given', function(){
			let comparation = encryption.compare( password );
			Should( comparation ).be.equal( false );
		});
	});
});