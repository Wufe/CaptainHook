/// <reference path="../../../typings/index.d.ts" />

import * as Should from 'should';
import {Environment, getEnvironment} from '../../../src/core/chook';

describe( 'Environment', () => {
	describe( 'getEnvironment', () => {
		it( 'should return an Environment instance', () => {
			Should( getEnvironment() instanceof Environment ).be.equal( true );
		});
	});
	let environment = getEnvironment();
	describe( 'set', () => {
		it( 'should set a value', () => {
			environment.set( '1', 1, 2, 3 );
			Should( environment ).have.propertyByPath( '1', '2', '3' ).which.is.equal( '1' );
		});
	});
	describe( 'get', () => {
		it( 'should get a value previously set', () => {
			environment.set( 'z', 'a', 'b', 'c' );
			Should( environment.get( 'a', 'b', 'c' ) ).be.equal( 'z' );
		});
	})
});