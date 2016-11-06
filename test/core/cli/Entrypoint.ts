/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import {Entrypoint} from '../../../src/core/cli';
import {Environment} from '../../../src/core/chook';

describe( `Entrypoint`, () => {
	it( `should be a function`, () => {
		Should( typeof Entrypoint ).be.equal( "function" );
	});
	it( `should create an argumentParser after instantiation`, () => {
		let entrypoint: Entrypoint = new Entrypoint();
		Should( typeof entrypoint.argumentParser ).not.be.equal( "undefined" );
	});
});