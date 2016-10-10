var assert = require( 'assert' );
var expect = require( 'chai' ).expect;
var Server = require( '../../../build/lib/chook.js' ).Server;

describe( 'Server', function(){
	
});

describe( 'Server', function(){
	var server;
	before( function(){
		server = new Server();
	});
	it( 'should be a function', function(){
		assert.equal( typeof Server, 'function' );
	});
	it( 'should create a express app', function(){
		assert.equal( typeof server, 'object' );
	});
});

describe( 'Server.validateMethod', function(){
	var server;
	before( function(){
		server = new Server();
	});
	it( 'should throw a TypeError with invalid method', function(){
		expect( server.validateMethod.bind( server, 'asd' ) ).to.throw( 'Not a valid method.' );
	});
	it( 'should be fine with a valid one', function(){
		expect( server.validateMethod.bind( server, 'all' ) ).to.not.throw( 'Not a valid method.' );
	});
});