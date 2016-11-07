/// <reference path="../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import Configuration from '../../src/core/Configuration';
import * as Conf from '../../src/core/Configuration';

describe( 'Configuration', () => {
	describe( `its instance`, () => {
		it( 'should be an object', () => {
			Configuration.should.be.an.Object;
		});
	});
	describe( `readConfiguration`, () => {
		it( 'should produce a default configuration object', () => {
			Configuration.readConfiguration();
			let typeOfConfigurationObject: string = typeof Configuration.configuration;
			typeOfConfigurationObject.should.not.be.equal( "undefined" );
		});
	});
	describe( `set`, () => {
		it( 'should add a string configuration value', () => {
			Configuration.set( 'lol', 'asd' );
			Configuration.should.have.propertyByPath( 'configuration', 'content', 'asd' ).which.is.equal( "lol" );
		});
		it( 'should add a array configuration value', () => {
			Configuration.set( [ 'lol', 'rofl' ], 'asd' );
			Configuration.should.have.propertyByPath( 'configuration', 'content', 'asd' ).which.is.Array;
			Configuration.should.have.propertyByPath( 'configuration', 'content', 'asd' ).which.containDeep([ "lol", "rofl" ]);
		});
		it( 'should add a object configuration value', () => {
			Configuration.set( { lol: 'lol', rofl: 'rofl' }, 'asd' );
			Configuration.should.have.propertyByPath( 'configuration', 'content', 'asd', 'lol' ).which.equal( 'lol' );
			Configuration.should.have.propertyByPath( 'configuration', 'content', 'asd', 'rofl' ).which.equal( 'rofl' );
		});
	});
	describe( `get`, () => {
		Configuration.set({
			b: 'c',
			d: {
				e: 'f'
			}
		}, 'a' );
		it( 'should get a single value', () => {
			let value = Configuration.get( 'a', 'b' );
			value.should.equal( "c" );
		})
		it( 'should get nested element value', () => {
			let value = Configuration.get( 'a', 'd' );
			Should( value ).have.property( 'e' ).which.is.equal( 'f' );
		});
	});
	describe( `getDefaultConfiguration`, () => {
		it( `should create a default jwt secret`, () => {
			Should( Configuration.getDefaultConfiguration() )
				.have
				.propertyByPath( 'security', 'jwt', 'secret', 'length' )
				.which
				.is
				.equal( 64 );
		});
	});
	describe( `getFileContent`, () => {
		it( `should fail with wrong path`, () => {
			Should( Configuration.getFileContent( `/dev/null/config.yml` ) )
				.be
				.equal( null );
		});
	});
	describe( `dumpConfiguration`, () => {
		it( `should fail with wrong path`, () => {
			let conf: Conf.Configuration = new Conf.Configuration();
			conf.configurationPath = '/dev/null/config.yml';
			Should( conf.dumpConfiguration({}) ).be.equal( false );
		});
	});
});