/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import Database from '../../../src/core/data/Database';

describe( 'Database', function(){
	describe( 'models', function(){
		it( 'should contain a model called "user"', function(){
			Database.models.should.have.property( 'user' );
		});
	});
});