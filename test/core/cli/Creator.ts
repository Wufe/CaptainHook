/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import {ArgumentParser, SubParser, SubparserOptions} from 'argparse';
import {Creator} from '../../../src/core/cli';

describe( `Creator`, () => {
	let creator: Creator = new Creator();
	describe( `createArgumentParser`, () => {
		let argumentParser: ArgumentParser = creator.createArgumentParser();
		it( `should return an ArgumentParser`, () => {
			Should( typeof argumentParser ).not.be.equal( "undefined" );
		});
	});
	describe( `addSubparser`, () => {
		it( `should call ArgumentParser.addSubparser`, ( done ) => {
			let mockArgumentParser: ArgumentParser;
			mockArgumentParser = <ArgumentParser>({
				addSubparsers: ( options? : SubparserOptions ): SubParser => {
					Should( options ).have.property( 'title' ).which.is.equal( 'title_' );
					Should( options ).have.property( 'dest' ).which.is.equal( 'dest_' );
					done();
					return null;
				}
			});
			creator.addSubparser( , {} );
		})
		
	});
});