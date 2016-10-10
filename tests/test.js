var assert = require( 'assert' );
var CHook = require( '../build/lib/chook.js' );

describe( 'CHook.Cli', function(){
	it( 'should be a function', function(){
		assert.equal( typeof CHook.Cli, 'function' );
	});
});