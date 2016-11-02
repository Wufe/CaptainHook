/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import {FrontendRouter} from '../../../src/core/gui';
import {Server} from '../../../src/core/server';

describe( 'FrontendRouter', function(){
	let frontendRouter: FrontendRouter;
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