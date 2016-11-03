/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import {Environment} from '../../../src/core/chook';
import {Renderer} from '../../../src/core/gui';

describe( 'Renderer', () => {
	let renderer: Renderer = new Renderer();
	describe( 'compile', () => {
		it( `should return data compiled`, () => {
			let data: any = {
				text: 'message'
			};
			Should( renderer.compile( `${Environment.buildDirectory}/resources/views/test.html`, data ) ).be.equal( 'message' );
		});
	});
});