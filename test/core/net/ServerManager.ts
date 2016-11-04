/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import Configuration from '../../../src/core/Configuration';
import {GUIManager} from '../../../src/core/gui';
import {Router} from '../../../src/core/auth';
import {ServerManager} from '../../../src/core/net';

describe( 'ServerManager', function(){
	Configuration.set( true, 'gui' );
	let serverManager = new ServerManager();
	describe( `initialize`, () => {
		it( `should create instances for authenticationRouter and guiManager`, () => {
			serverManager.initialize();
			Should( typeof serverManager.authenticationRouter ).not.be.equal( "undefined" );
			Should( typeof serverManager.guiManager ).not.be.equal( "undefined" );
		});
	});
	describe( 'createAuthenticationRouter', function(){
		let authenticationRouter = serverManager.createAuthenticationRouter();
		it( 'should create Authentication.Router instance', function(){
			authenticationRouter.should.be.an.instanceOf( Router );
		});
	})
	describe( 'createGuiManager', function(){
		let guiManager = serverManager.createGuiManager();
		it( 'should create GUIManager instance', function(){
			guiManager.should.be.an.instanceOf( GUIManager );
		});
	})
});