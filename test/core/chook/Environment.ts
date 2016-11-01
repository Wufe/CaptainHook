/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import Environment from '../../../src/core/chook/Environment';
import * as Utils from '../../../src/core/chook/Utils';

describe( 'Environment', function(){
	describe( 'projectRoot', function(){
		it( 'should be a folder', function(){
			let isDirectory = Utils.isDirectory( Environment.projectRoot );
			isDirectory.should.be.exactly( true );
		});
	});
	describe( 'buildDirectory', function(){
		it( 'should be a folder', function(){
			let isDirectory = Utils.isDirectory( Environment.buildDirectory );
			isDirectory.should.be.exactly( true );
		});
		it( 'should contain the lib folder', function(){
			let isDirectory = Utils.isDirectory( Environment.buildDirectory + "/lib" );
			isDirectory.should.be.exactly( true );
		})
	});
});