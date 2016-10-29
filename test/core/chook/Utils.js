const fs = require( 'fs' );
const Utils = require( '../../../build/lib/chook.js' ).Utils;

describe( 'Utils', function(){
	let testFile = './utils.test';
	let testDirectory = './utils.test.dir';
	before( function(){
		fs.writeFileSync( testFile, '' );
		fs.mkdirSync( testDirectory );
	});
	describe( 'fileExists', function(){
		it( 'should be a function', function(){
			Utils.fileExists.should.be.a.Function;
		});
		it( 'should return false if a file does not exist', function(){
			Utils.fileExists( './UtilsFileExistsTestFile' ).should.be.exactly(false);
		});
		it( 'should return true if a file exists', function(){
			Utils.fileExists( testFile ).should.be.exactly(true);
		});
	});
	describe( 'isFile', function(){
		it( 'should be a function', function(){
			Utils.isFile.should.be.a.Function;
		});
		it( 'should return false if a file does not exist', function(){
			Utils.isFile( './UtilsFileExistsTestFile' ).should.be.exactly(false);
		});
		it( 'should return false if the path is not a file', function(){
			Utils.isFile( testDirectory ).should.be.exactly(false);
		});
		it( 'should return true if the path is a file', function(){
			Utils.isFile( testFile ).should.be.exactly(true);
		});
	});
	describe( 'isDirectory', function(){
		it( 'should be a function', function(){
			Utils.isDirectory.should.be.a.Function;
		});
		it( 'should return false if a directory does not exist', function(){
			Utils.isDirectory( './UtilsFileExistsTestFile' ).should.be.exactly(false);
		});
		it( 'should return false if the path is not a directory', function(){
			Utils.isDirectory( testFile ).should.be.exactly(false);
		});
		it( 'should return true if the path is a directory', function(){
			Utils.isDirectory( testDirectory ).should.be.exactly(true);
		});
	});
	after( function(){
		fs.unlinkSync( testFile );
		fs.rmdirSync( testDirectory );
	});
	describe( 'setNestedValue', function(){
		let obj = { deep1: 't' };
		it( 'should create 3 level deep nested element in object', function(){
			obj = Utils.setNestedValue( obj, 'nestedValue', 'deep1', 'deep2', 'deep3' );
			obj.should.have.propertyByPath( 'deep1', 'deep2', 'deep3' ).eql( 'nestedValue' );
		});
	});
	describe( 'getNestedValue', function(){
		let obj = {
			deep1: {
				deep2: {
					deep3: 'nestedValue'
				}
			}
		};
		it( 'should get 3 level deep nested value in object', function(){
			let nestedValue = Utils.getNestedValue( obj, 'deep1', 'deep2', 'deep3' );
			nestedValue.should.be.exactly( 'nestedValue' );
		});
	})
});