/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import {Router} from '../../../src/core/authentication';
import GUIManager from '../../../src/core/gui/GUIManager';
import ServerManager from '../../../src/core/server/ServerManager';

describe( 'ServerManager', function(){
	let serverManager = new ServerManager();
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