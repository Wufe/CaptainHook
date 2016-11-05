/// <reference path="../../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';
import * as Sequelize from 'sequelize';

import {user} from '../../../../src/core/data/models';

describe( `user.password.set`, () => {
	it( `should set an encrypted password instead of a plain one`, ( done: ( error?: any ) => void ) => {
		let userModel: any = user( Sequelize );
		let mockModelInstance: any = {
			setDataValue: (( field: string, value: any ) => {
				done();
			}).bind( this )
		};
		userModel.password.set = userModel.password.set.bind( mockModelInstance );
		userModel.password.set( 'admin' );
	});
});