const ServerManager = require( '../../../build/lib/chook.js' ).ServerManager;
const Path = require( 'path' );

const serverManager = new ServerManager();
const guiManagerInstance = serverManager.createGuiManager();

describe( 'GUIManager', function(){
	describe( 'getUrlPathname', function(){
		let assetsMockRequest = {
			url: 'https://test.dev/assets/javascript/test.chunk.js'
		};
		let genericMockRequest = {
			url: 'https://test.dev/test'
		};
		it( 'should return the pathname of a request object', function(){
			guiManagerInstance.getUrlPathname( assetsMockRequest ).should.be.exactly( '/assets/javascript/test.chunk.js' );
			guiManagerInstance.getUrlPathname( genericMockRequest ).should.be.exactly( '/test' );
		});
	});
	describe( 'isAssetsDir', function(){
		let pathname = '/assets/javascript/test.chunk.js';
		it( 'should return true if the pathname is the assets one', function(){
			guiManagerInstance.isAssetsDir( pathname ).should.be.exactly(true);
		});
		it( 'should return false if the pathname is not the assets one', function(){
			guiManagerInstance.isAssetsDir( '/test' ).should.be.exactly(false);
		});
	});
	describe( 'getResourcePath', function(){
		let pathname = '/javascript/test.chunk.js';
		let assetsPath = Path.resolve( Path.join( '..', 'resources', 'assets' ) );
		it( 'should return the exact pathname for the asset', function(){
			guiManagerInstance.getResourcePath( pathname ).should.be.exactly( `${assetsPath}${pathname}` );
		});
	});
});