const assert = require( 'assert' );
const expect = require( 'chai' ).expect;
const Server = require( '../../../build/lib/chook.js' ).Server;

describe( 'Server', function(){
	
});

describe( 'Server', function(){
	let server;
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
	let server;
	before( function(){
		server = new Server();
	});
	it( 'should throw a TypeError with invalid method', function(){
		expect( server.validateMethod.bind( server, 'asd' ) ).to.throw( 'Not a valid method.' );
	});
	let validMethods = [ 'get', 'post', 'patch', 'put', 'delete', 'all' ];
	for( let i = 0; i < validMethods.length; i++ ){
		let method = validMethods[i];
		it( 'should be fine with a valid ' + method + ' method', function(){
			expect( server.validateMethod.bind( server, method ) ).to.not.throw( 'Not a valid method.' );
		});
	}
	
});