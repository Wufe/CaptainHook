const CHook = require( '../../../build/lib/chook.js' );
const Server = CHook.Server;
const FrontendRouter = CHook.FrontendRouter;

describe( 'FrontendRouter', function(){
	let frontendRouter;
	before(function(){
		let server = new Server();
		frontendRouter = new FrontendRouter( server );
	});
	describe( 'getUrlPathname', function(){
		let assetsMockRequest = {
			url: 'https://test.dev/assets/javascript/test.chunk.js'
		};
		let genericMockRequest = {
			url: 'https://test.dev/test'
		};
		it( 'should return the pathname of a request object', function(){
			frontendRouter.getUrlPathname( assetsMockRequest ).should.be.exactly( '/assets/javascript/test.chunk.js' );
			frontendRouter.getUrlPathname( genericMockRequest ).should.be.exactly( '/test' );
		});
	});
	describe( 'isAssetsDir', function(){
		let pathname = '/assets/javascript/test.chunk.js';
		it( 'should return true if the pathname is the assets one', function(){
			frontendRouter.isAssetsDir( pathname ).should.be.exactly(true);
		});
		it( 'should return false if the pathname is not the assets one', function(){
			frontendRouter.isAssetsDir( '/test' ).should.be.exactly(false);
		});
	});

});