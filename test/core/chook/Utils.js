const fs = require( 'fs' );
const Utils = require( '../../../build/lib/chook.js' ).Utils;
describe( 'Utils', function(){
	describe( 'fileExists', function(){
		it( 'should be a function', function(){
			Utils.fileExists.should.be.a.Function;
		});
	});
	describe( 'isFile', function(){
		it( 'should be a function', function(){
			Utils.isFile.should.be.a.Function;
		});
	});
	describe( 'isDirectory', function(){
		it( 'should be a function', function(){
			Utils.isDirectory.should.be.a.Function;
		});
	});
});