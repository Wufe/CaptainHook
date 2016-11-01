/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import ServerManager from '../../../src/core/server/ServerManager';

const serverManager = new ServerManager();
const guiManagerInstance = serverManager.createGuiManager();

describe( 'GUIManager', function(){
	describe( 'setup', function(){
		it( 'should be a function', function(){
			guiManagerInstance.setup.should.be.a.Function;
		});
	});
});