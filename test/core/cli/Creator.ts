/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import {ArgumentOptions, ArgumentParser, SubArgumentParserOptions, SubParser, SubparserOptions} from 'argparse';
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
				addSubparsers: ( options?: SubparserOptions ): SubParser => {
					Should( options ).have.property( 'title' ).which.is.equal( 'title_' );
					Should( options ).have.property( 'dest' ).which.is.equal( 'dest_' );
					done();
					return null;
				}
			});
			creator.addSubparser( mockArgumentParser, {
				title: 'title_',
				dest: 'dest_'
			});
		})
	});
	describe( `addCommand`, () => {
		it( `should call SubParser.addParser`, ( done ) => {
			let mockSubParser: SubParser;
			mockSubParser = <SubParser>({
				addParser: ( name: string, options?: SubArgumentParserOptions ): ArgumentParser => {
					Should( name ).be.equal( 'name_' );
					Should( options ).have.property( 'addHelp' ).which.is.equal( true );
					Should( options ).have.property( 'help' ).which.is.equal( "help_" );
					done();
					return null;
				}
			});
			creator.addCommand( mockSubParser, {
				id: 'name_',
				addHelp: true,
				help: 'help_'
			});
		});
	});
	describe( `addArgument`, () => {
		it( `should call ArgumentParser.addArgument`, ( done ) => {
			let mockArgumentParser: ArgumentParser;
			mockArgumentParser = <ArgumentParser>({
				addArgument: ( args : string[], options?: ArgumentOptions ): void => {
					Should( args ).be.equal( "arg_" );
					Should( options ).have.property( "action" ).which.is.equal( "store" );
					done();
				}
			});
			creator.addArgument( mockArgumentParser, {
				id: "arg_",
				action: "store"
			});
		});
	});
});