/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import Environment from '../../../src/core/chook/Environment';
import * as Log from '../../../src/core/chook/Log';

import {transports, TransportInstance} from 'winston';
const {Console} = transports;

describe( `Log`, () => {
	let log: Log.Log = new Log.Log();
	describe( `checkDirectory`, () => {
		log.checkDirectory();
		it( `should find the log directory`, () => {
			Should( log.directoryFound ).be.equal( true );
		});
	});
	describe( `getTimestamp`, () => {
		it( `should return a coloured timestamp`, () => {
			let time: string = log.getTimestamp();
			Should( typeof time ).be.equal( "string" );
		});
	});
	describe( 'isQuiet', () => {
		describe( 'when Environment.args.quiet is true', () => {
			Environment.set( true, 'args', 'quiet' );
			let isQuiet: boolean = log.isQuiet();
			it( `should return true`, () => {
				Should( isQuiet ).be.equal( true );
			});
		});
		describe( 'when Environment.args.quiet is false', () => {
			Environment.set( false, 'args', 'quiet' );
			let isQuiet: boolean = log.isQuiet();
			it( `should return false`, () => {
				Should( isQuiet ).be.equal( false );
			});
		});
		describe( 'when Environment.args.quiet is false and Environment.quiet is true', () => {
			Environment.set( false, 'args' );
			Environment.quiet = true;
			let isQuiet: boolean = log.isQuiet();
			it( `should return true`, () => {
				Should( isQuiet ).be.equal( true );
			});
		});
		describe( 'when Environment.args.quiet is undefined and Environment.quiet is false', () => {
			Environment.set( undefined, 'args' );
			Environment.quiet = false;
			let isQuiet: boolean = log.isQuiet();
			it( `should return false`, () => {
				Should( isQuiet ).be.equal( false );
			});
		});
	});
	describe( `getTransports`, () => {
		let transports: TransportInstance[] = log.getTransports();
		it( `should return two items if Environment's quiet is false`, () => {
			Should( transports.length ).be.equal( 2 );
		});
		let consoleTransport: TransportInstance = transports[1];
		it( `should have the second element's timestamp`, () => {
			Should( typeof consoleTransport ).not.be.equal( "undefined" );
		});
	});
	describe( `setup`, () => {
		log.setup();
		it( `should contain a logger property that is not undefined`, () => {
			Should( typeof log.logger ).not.be.equal( "undefined" );
		});
	});
});