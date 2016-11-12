/// <reference path="../../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import {Configuration, ConfigurationClass} from '../../../../src/core/chook';
import {configurationDefault} from '../../../../src/core/chook';

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
	describe( `default configuration`, () => {
		it( `should create a default jwt secret`, () => {
			Should( configurationDefault )
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
			let conf: ConfigurationClass = new ConfigurationClass();
			conf.configurationPath = '/dev/null/config.yml';
			Should( conf.dumpConfiguration({}) ).be.equal( false );
		});
	});
});