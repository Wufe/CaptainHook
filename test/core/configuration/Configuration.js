const assert = require( 'assert' );
const expect = require( 'chai' ).expect;
const Configuration = require( '../../../build/lib/chook.js' ).Configuration;

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
		assert.equal( typeof Configuration.configuration == 'undefined', false );
	});
});

describe( 'Configuration.set', function(){
	it( 'should add a string configuration value', function(){
		Configuration.set( 'lol', 'asd' );
		assert.equal( Configuration.configuration.asd, 'lol' );
	});
	it( 'should add a array configuration value', function(){
		Configuration.set( [ 'lol', 'rofl' ], 'asd' );
		assert.equal( Configuration.configuration.asd[0], 'lol' );
		assert.equal( Configuration.configuration.asd[1], 'rofl' );
	});
	it( 'should add a object configuration value', function(){
		Configuration.set( { lol: 'lol', rofl: 'rofl' }, 'asd' );
		assert.equal( Configuration.configuration.asd.lol, 'lol' );
		assert.equal( Configuration.configuration.asd.rofl, 'rofl' );
	});
});

describe( 'Configuration.get', function(){
	before( function(){
		Configuration.set( 'dsa', 'asd' );
		Configuration.set({ lal: 'rofl' }, 'lol' );
	});
	it( 'should get a single value', function(){
		let value = Configuration.get( 'asd' );
		assert.equal( value, 'dsa' );
	})
	it( 'should get nested element value', function(){
		let value = Configuration.get( 'lol', 'lal' );
		assert.equal( value, 'rofl' );
	});
});