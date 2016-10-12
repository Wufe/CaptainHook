const assert = require( 'assert' );
const expect = require( 'chai' ).expect;
const Configuration = require( '../../../build/lib/chook.js' ).Configuration;

describe( 'Configuration', function(){
	let configuration;
	before( function(){
		configuration = new Configuration();
	});
	it( 'should be a function', function(){
		Configuration.should.be.a.Function;
	});
	describe( 'Configuration\'s instance', function(){
		it( 'should be an object', function(){
			configuration.should.be.an.Object;
		});
	});
});

describe( 'Configuration.readConfiguration', function(){
	before( function(){
		configuration = new Configuration();
		configuration.configuration = undefined;
	});
	it( 'should produce a default configuration object', function(){
		configuration.readConfiguration();
		assert.equal( typeof configuration.configuration == 'undefined', false );
	});
});

describe( 'Configuration.set', function(){
	before( function(){
		configuration = new Configuration();
	});
	it( 'should add a string configuration value', function(){
		configuration.set( 'asd', 'lol' );
		assert.equal( configuration.configuration.asd, 'lol' );
	});
	it( 'should add a array configuration value', function(){
		configuration.set( 'asd', [ 'lol', 'rofl' ]);
		assert.equal( configuration.configuration.asd[0], 'lol' );
		assert.equal( configuration.configuration.asd[1], 'rofl' );
	});
	it( 'should add a object configuration value', function(){
		configuration.set( 'asd', { lol, rofl });
		assert.equal( configuration.configuration.asd.lol, 'lol' );
		assert.equal( configuration.configuration.asd.rofl, 'rofl' );
	});
});