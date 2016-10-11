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