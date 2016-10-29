const CHook = require( '../../../build/lib/chook.js' );
const Environment = CHook.Environment;
const Utils = CHook.Utils;

describe( 'Environment', function(){
	describe( 'projectRoot', function(){
		it( 'should be a folder', function(){
			let isDirectory = Utils.isDirectory( Environment.projectRoot );
			isDirectory.should.be.exactly( true );
		});
	});
	describe( 'buildDirectory', function(){
		it( 'should be a folder', function(){
			let isDirectory = Utils.isDirectory( Environment.buildDirectory );
			isDirectory.should.be.exactly( true );
		});
		it( 'should contain the lib folder', function(){
			let isDirectory = Utils.isDirectory( Environment.buildDirectory + "/lib" );
			isDirectory.should.be.exactly( true );
		})
	});
});