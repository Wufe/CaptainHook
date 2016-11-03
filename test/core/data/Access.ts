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
			describe( `data instance manager`, () => {
				it( `should return a valid actor instance if valid data provided`, ( done ) => {
					let mockDatabaseResults: any = {
						dataValues: {
							random: 'data'
						}
					};
					let actorInstancePromise: Promise<any> = new Promise<any>( ( resolve, reject ) => {
						accessInstance.handleSingleDataInstance( mockDatabaseResults, resolve, reject );
					});
					actorInstancePromise
						.then( ( actorInstance: any ) => {
							Should( actorInstance.get( 'random' ) ).be.equal( 'data' );
							done();
						})
						.catch( ( error: any ) => {
							done( error );
						});
				});
				it( `should return an error if invalid data provided`, ( done ) => {
					let mockDatabaseResults: any = {
						dataValues: null
					};
					let actorInstancePromise: Promise<any> = new Promise<any>( ( resolve, reject ) => {
						accessInstance.handleSingleDataInstance( mockDatabaseResults, resolve, reject );
					});
					actorInstancePromise
						.then( ( actorInstance: any ) => {
							done( new Error( 'The instance should not be valid.' ));
						})
						.catch( ( error: Error ) => {
							error.message.should.be.equal( "No data returned." );
							done();
						});
				});
				it( `should return an error if no data provided at all`, ( done ) => {
					let mockDatabaseResults: any = null;
					let actorInstancePromise: Promise<any> = new Promise<any>( ( resolve, reject ) => {
						accessInstance.handleSingleDataInstance( mockDatabaseResults, resolve, reject );
					});
					actorInstancePromise
						.then( ( actorInstance: any ) => {
							done( new Error( 'The instance should not be valid.' ));
						})
						.catch( ( error: Error ) => {
							error.message.should.be.equal( "No results found." );
							done();
						});
				});
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