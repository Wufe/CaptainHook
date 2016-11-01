/// <reference path="../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import Cli from '../src/core/cli';

describe( 'CHook.Cli', function(){
	it( 'should be a function', function(){
		( typeof Cli ).should.be.equal( "function" );
	});
});