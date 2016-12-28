/// <reference path="../../../typings/index.d.ts" />

import * as Should from 'should';
import {join} from 'path';
import {getBuildDirectory, Utils} from '../../../src/core/chook';

describe( 'Utils', () => {
	describe( 'fileExists', () => {
		it( 'should return true if a file exists', () => {
			let path = join( getBuildDirectory(), 'resources', 'database.test.sqlite' );
			Should( Utils.fileExists( path ) ).be.equal( true );
		});
		it( 'should return false if a file does not exist', () => {
			let path = join( getBuildDirectory(), 'resources', 'database.mocha.sqlite' );
			Should( Utils.fileExists( path ) ).be.equal( false );
		});
	});
	describe( 'isFile', () => {
		it( 'should return true if the argument is a file', () => {
			let path = join( getBuildDirectory(), 'resources', 'views', 'index.html' );
			Should( Utils.isFile( path ) ).be.equal( true );
		});
		it( 'should return false if the argument is not a file', () => {
			let path = join( getBuildDirectory(), 'resources', 'views' );
			Should( Utils.isFile( path ) ).be.equal( false );
		});
	});
	describe( 'isDirectory', () => {
		it( 'should return false if the argument is a file', () => {
			let path = join( getBuildDirectory(), 'resources', 'views', 'index.html' );
			Should( Utils.isDirectory( path ) ).be.equal( false );
		});
		it( 'should return true if the argument is not a file', () => {
			let path = join( getBuildDirectory(), 'resources', 'views' );
			Should( Utils.isDirectory( path ) ).be.equal( true );
		});
	});
	describe( 'truncateText', () => {
		let text = "0123456789ABCDEF";
		it( 'should truncate text when its length exceeds the offset', () => {
			let truncatedText = Utils.truncateText( text, 2 );
			Should( truncatedText ).be.equal( "01.." );
		});
		it( 'should not truncate text when its length does not exceed the offset', () => {
			let truncatedText = Utils.truncateText( text, 17 );
			Should( truncatedText ).be.equal( text );
		});
		it( 'should return the string itself if the string length is 0 and the offset is 0 too', () => {
			let truncatedText = Utils.truncateText( ``, 0 );
			Should( truncatedText ).be.equal( `` );
		});
		it( 'should return the string itself if the string length and the offset are the same', () => {
			let truncatedText = Utils.truncateText( text, 16 );
			Should( truncatedText ).be.equal( text );
		});
	});
	describe( 'getNestedValue', () => {
		let object = {
			a: 'α',
			b: [
				'β',
				'γ',
				'δ',
				{
					e: 'ε'
				}
			]
		};
		it( 'should get nested value in array', () => {
			Should( Utils.getNestedValue( object, 'b', '3', 'e' ) ).be.equal( 'ε' );
		});
	});
	describe( 'setNestedValue', () => {
		it( 'should set nested value in an empty object by reference', () => {
			let object = {};
			Utils.setNestedValue( object, 'β', 'a', 'b' )
			Should( object ).have.propertyByPath( 'a', 'b' ).which.is.equal( 'β' );
		});
		it( 'should set nested value in an empty object and pass it by value', () => {
			let object = {};
			Should( Utils.setNestedValue( object, 'β', 'a', 'b' ) ).have.propertyByPath( 'a', 'b' ).which.is.equal( 'β' );
		});
	});
});