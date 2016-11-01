/// <reference path="../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import Configuration from '../../src/core/Configuration';

describe( 'Configuration', function(){
	describe( 'Configuration\'s instance', function(){
		it( 'should be an object', function(){
			Configuration.should.be.an.Object;
		});
	});
});

describe( 'Configuration.readConfiguration', function(){
	it( 'should produce a default configuration object', function(){
		Configuration.readConfiguration();
		let typeOfConfigurationObject: string = typeof Configuration.configuration;
		typeOfConfigurationObject.should.not.be.equal( "undefined" );
	});
});

describe( 'Configuration.set', function(){
	it( 'should add a string configuration value', function(){
		Configuration.set( 'lol', 'asd' );
		Configuration.should.have.propertyByPath( 'configuration', 'asd' ).which.is.equal( "lol" );
	});
	it( 'should add a array configuration value', function(){
		Configuration.set( [ 'lol', 'rofl' ], 'asd' );
		Configuration.should.have.propertyByPath( 'configuration', 'asd' ).which.is.Array;
		Configuration.should.have.propertyByPath( 'configuration', 'asd' ).which.containDeep([ "lol", "rofl" ]);
	});
	it( 'should add a object configuration value', function(){
		Configuration.set( { lol: 'lol', rofl: 'rofl' }, 'asd' );
		Configuration.should.have.propertyByPath( 'configuration', 'asd', 'lol' ).which.equal( 'lol' );
		Configuration.should.have.propertyByPath( 'configuration', 'asd', 'rofl' ).which.equal( 'rofl' );
	});
});

describe( 'Configuration.get', function(){
	before( function(){
		Configuration.set( 'dsa', 'asd' );
		Configuration.set({ lal: 'rofl' }, 'lol' );
	});
	it( 'should get a single value', function(){
		let value = Configuration.get( 'asd' );
		value.should.equal( "dsa" );
	})
	it( 'should get nested element value', function(){
		let value = Configuration.get( 'lol', 'lal' );
		value.should.equal( "rofl" );
	});
});