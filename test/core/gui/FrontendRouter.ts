/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import {Environment} from '../../../src/core/chook';
import {FrontendRouter, Renderer} from '../../../src/core/gui';
import {Server} from '../../../src/core/server';

describe( 'FrontendRouter', function(){
	let server = new Server();
	let frontendRouter: FrontendRouter = new FrontendRouter( server );
	let mockExpressResponse: any = ( callback: ( ...values: any[] ) => void ) => {
		return {
			sendFile: ( resource: any ) => {
				callback( resource );
			},
			status: ( code: number ) => {
				return {
					send: ( body: string ) => {
						callback( code, body );
					}
				};
			}
		}
	};
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
	describe( 'getRenderer', function(){
		it( `should return an object instance of Renderer`, () => {
			Should( frontendRouter.getRenderer() ).be.instanceOf( Renderer );	
		});
	});
	describe( 'getResourcePath', () => {
		let resourcePath: string = `${Environment.buildDirectory}/resources/assets/css/main.css`;
		it( `should return '${resourcePath}'`, () => {
			frontendRouter.getResourcePath( 'css/main.css' ).should.be.equal( resourcePath );
		});
	});
	describe( 'sendFile', () => {
		it( `should call response's sendFile`, ( done ) => {
			let resourcePath: string = `resource_.txt`;
			frontendRouter.sendFile( mockExpressResponse(( resource: string ) => {
				Should( resource ).be.equal( resourcePath );
				done();
			}), 'resource_.txt' );
		});
	});
	describe( 'sendNotFound', () => {
		it( `should call response's send function after status function`, ( done ) => {
			frontendRouter.sendNotFound( mockExpressResponse(( code: number, body: string ) => {
				Should( code ).be.equal( 404 );
				Should( body ).be.equal( `Cannot find resource_.txt.` );
				done();
			}), 'resource_.txt' );
		});
	});

});