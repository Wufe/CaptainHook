/// <reference path="../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import * as CHook from '../../src/core';

describe( `root`, () => {
	it( `should expose Entrypoint and ServerManager`, () => {
		Should( typeof CHook.Entrypoint ).not.be.equal( "undefined" );
		Should( typeof CHook.ServerManager ).not.be.equal( "undefined" );
	});
});