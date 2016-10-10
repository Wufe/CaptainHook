var assert = require( 'assert' );
var CHook = require( '../../../build/lib/chook.js' );

describe( 'CHook.Server', function(){
	it( 'should be a function', function(){
		assert.equal( typeof CHook.Server, 'function' );
	});
});

describe( 'CHook.Server', function(){
	var server;
	before( function(){
		server = new CHook.Server();
	});
	it( 'should create a express app', function(){
		assert.equal( typeof server, 'object' );
	});
});