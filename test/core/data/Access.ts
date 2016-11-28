/// <reference path="../../../typings/index.d.ts" />

import * as Mocha from 'mocha';
import * as Should from 'should';

import {Access, AccessInterface, Database} from '../../../src/core/data';

import {Actors, ActorType} from '../actors';

describe( 'Access', () => {
	Actors.forEach( ( actor: ActorType ) => {
		describe( `${actor.name}`, () => {
			let accessInstance: Access<any> = new Access( actor.class, actor.model );
			it( `should be able to create an instance`, () => {
				Should( accessInstance ).have.propertyByPath( 'model' );
			});
			it( `should have a table name '${actor.table}'`, () => {
				accessInstance.model.getTableName().should.be.exactly( actor.table );
			});
			describe( `findById`, () => {
				it( `should return a Promise`, ( done ) => {
					let accessPromise: any = accessInstance.findById().then( () => {
						done();
					}).catch( () => {
						done();
					});
					Should( typeof accessPromise ).not.be.equal( "undefined" );
				});
			});
			describe( `findOne`, () => {
				it( `should return a Promise`, ( done ) => {
					let accessPromise: any = accessInstance.findOne().then( () => {
						done();
					}).catch( () => {
						done();
					});
					Should( typeof accessPromise ).not.be.equal( "undefined" );
				});
			});
			describe( `findAll`, () => {
				it( `should return a Promise`, ( done ) => {
					let accessPromise: any = accessInstance.findAll().then( () => {
						done();
					}).catch( () => {
						done();
					});
					Should( typeof accessPromise ).not.be.equal( "undefined" );
				});
			});
		});
	});
});