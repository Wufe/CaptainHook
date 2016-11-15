/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import {Configuration} from '../../../src/core/chook';
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
});