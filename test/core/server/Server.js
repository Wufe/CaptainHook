const assert = require( 'assert' );
const expect = require( 'chai' ).expect;
const Server = require( '../../../build/lib/chook.js' ).Server;

describe( 'Server', function(){
	let server;
	before( function(){
		server = new Server();
	});
	it( 'should be a function', function(){
		Server.should.be.a.Function;
	});
	it( 'should create a express app', function(){
		server.should.be.an.Object;
	});
});