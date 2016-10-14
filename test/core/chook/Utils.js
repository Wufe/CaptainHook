const fs = require( 'fs' );
const Utils = require( '../../../build/lib/chook.js' ).Utils;

describe( 'Utils', function(){
	describe( 'fileExists', function(){
		let testFile = './utils.test';
		before( function(){
			fs.writeFileSync( testFile, '' );
		});
		it( 'should be a function', function(){
			Utils.fileExists.should.be.a.Function;
		});
		it( 'should return false if a file does not exist', function(){
			Utils.fileExists( './UtilsFileExistsTestFile' ).should.be.exactly(false);
		});
		it( 'should return true if a file exists', function(){
			Utils.fileExists( testFile ).should.be.exactly(true);
		});
		after( function(){
			fs.unlinkSync( testFile );
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