/// <reference path="../../../typings/index.d.ts" />

import * as Should from 'should';
import {EntryManager, EntryModel, RequestManager} from '../../../src/core/chook';

describe( 'RequestManager', () => {
	let requestManager = new RequestManager();
	describe( 'create', () => {
		it( 'should be a function', () => {
			Should( requestManager.create ).be.a.Function;
		});
	});
	describe( 'getAll', () => {
		it( 'should be a function', () => {
			Should( requestManager.getAll ).be.a.Function;
		});
	});
});