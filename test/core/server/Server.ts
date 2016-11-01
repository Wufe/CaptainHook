/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import Server from '../../../src/core/server/Server';

describe( 'Server', function(){
	let server: Server;
	before( function(){
		server = new Server();
	});
	it( 'should be a function', function(){
		Server.should.be.a.Function;
	});
	it( 'should create a express app', function(){
		server.should.be.an.Object;
	});
});