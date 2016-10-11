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

describe( 'Server.validateMethod', function(){
	let server;
	before( function(){
		server = new Server();
	});
	it( 'should throw a TypeError with invalid method', function(){
		server.validateMethod.bind( server, 'asd' ).should.throw( 'Not a valid method.' );
	});
	let validMethods = [ 'get', 'post', 'patch', 'put', 'delete', 'all' ];
	for( let i = 0; i < validMethods.length; i++ ){
		let method = validMethods[i];
		it( 'should be fine with a valid ' + method + ' method', function(){
			server.validateMethod.bind( server, method ).should.not.throw( 'Not a valid method.' );
		});
	}
	
});