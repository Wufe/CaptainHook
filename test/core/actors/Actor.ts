/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import * as Sequelize from 'sequelize';

import {Actor, Hook, User} from '../../../src/core/actors';
import {Actors, ActorType} from '.';
import {AccessInterface, Database} from '../../../src/core/data';

describe( 'Actor', () => {
	Actors.forEach( ( actor: ActorType ) => {
		describe( actor.name, () => {
			it( `should have a 'find' attribute`, () => {
				let find: AccessInterface<any> = actor.class.find;
				Should( find ).have.a.property( 'byId' );
			});
			describe( `created instanciating Actor with ${actor.name} data`, () => {
				let actorInstance = new Actor( actor.model, { 'test': 'valu_e' });
				describe( `get`, () => {
					it( `should return previously set value`, () => {
						actorInstance.get( 'test' ).should.be.equal( 'valu_e' );
					});	
				});
				describe( `set`, () => {
					it( `should set a value and return it correctly`, () => {
						actorInstance.set( 'test', 'va_lue' );
						actorInstance.get( 'test' ).should.be.exactly( 'va_lue' );
					});
				});
			});
		});
	});
});