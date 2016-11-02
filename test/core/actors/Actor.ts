/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import * as Sequelize from 'sequelize';

import {Actor, Hook, User} from '../../../src/core/actors';

interface ActorType{
	name: string;
	class: any;
	model: Sequelize.Model<any, any>;
	table: string;
};

let actors: ActorType[] = [
	{
		name: 'User',
		class: User,
		model: User.model,
		table: 'users'
	},
	{
		name: 'Hook',
		class: Hook,
		model: Hook.model,
		table: 'hooks'
	}
];

describe( 'Actor', () => {
	actors.forEach( ( actor: ActorType ) => {
		describe( actor.name, () => {
			it( 'should have a model with a valid table name', () => {
				let model: Sequelize.Model<any, any> = actor.model;
				model.should.have.property( 'getTableName' );
			});
			describe( 'model', () => {
				it( `should have a table called ${actor.table}`, () => {
					let model: Sequelize.Model<any, any> = actor.model;
					model.getTableName().should.be.equal( actor.table );
				});
			});
		});
	});
	actors.forEach( ( actor: ActorType ) => {
		describe( actor.name, () => {
			it( `should reflect table named ${actor.table}`, () => {
				actor.model.getTableName().should.be.equal( actor.table );
			});
		});
	});
});