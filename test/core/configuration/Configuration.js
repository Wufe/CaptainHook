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