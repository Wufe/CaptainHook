/// <reference path="../../../typings/index.d.ts" />

import * as Should from 'should';
import {generateToken} from '../../../src/core/auth';

describe( 'Auth', () => {
	describe( 'Utils', () => {
		describe( 'generateToken', () => {
			let mockUser: any = {
				get( key: string ){
					if( key == 'id' )
						return 99;
				}
			};
			it( 'should generate a token', () => {
				Should( generateToken( mockUser ) ).be.a.String;
			});
		});
	});
});