/// <reference path="../../typings/index.d.ts" />

import * as Should from 'should';
import * as Faker from 'faker';
const uuid = require( 'uuid/v1' );

import {EntryManager, EntryModel, IEntry} from '../../src/core/chook';

const entries: IEntry[] = [
	{
		name: null,
		description: null,
		uri: null,
		method: 'post',
		options: {
			pipe: false,
			content_type: "text/plain",
			x_hub_signature: false,
			secret: null
		}
	},
	{
		name: Faker.internet.userName(),
		description: Faker.lorem.sentence( 5 ),
		uri: Faker.lorem.word() + uuid(),
		method: 'patch',
		options: {
			pipe: true,
			content_type: "application/json",
			x_hub_signature: true,
			secret: Faker.internet.password()
		}
	}
];

describe( 'EntryModel', () => {
	const entryManager = new EntryManager();
	let entryModels: EntryModel[] = [];
	describe( 'constructor', () => {
		it( 'should be able to create entries', ( done: ( error?: any ) => void ) => {
			let firstEntryModel = new EntryModel( entries[ 0 ] );
			let secondEntryModel = new EntryModel( entries[ 1 ] );
			firstEntryModel
				.save()
				.then( () => {
					return secondEntryModel.save();
				})
				.then( () => {
					done();
				})
				.catch( ( error: any ) => {
					done( error );
				})
		});
	})
});

describe( 'EntryManager', () => {
	const entryManager = new EntryManager();
	describe( 'getEntries', () => {
		it( 'should be able to load all entries', ( done: ( error?: any ) => void ) => {
			entryManager
				.getEntries()
				.then( () => {
					done();
				})
				.catch( ( error: any ) => {
					done( error );
				})
		});
		describe( 'loaded entries', () => {
			it( 'should be created with their parameters filled as expected', ( done: ( error?: any ) => void ) => {
				entryManager
					.getEntries()
					.then( ( entryModels: EntryModel[] ) => {
						Should( entryModels.length ).be.greaterThan( 0 );
						let entryWithoutName = entryModels.find( ( entryModel ) => {
							return entryModel.get( 'name' ) ? false : true;
						});
						let entryWithoutUri = entryModels.find( ( entryModel ) => {
							return entryModel.get( 'uri' ) ? false : true;
						});
						let entryWithSetName = entryModels.find( ( entryModel ) => {
							return entryModel.get( 'name' ) == entries[ 1 ].name;
						});
						Should( typeof entryWithoutName ).be.equal( "undefined" );
						Should( typeof entryWithoutUri ).be.equal( "undefined" );
						Should( typeof entryWithSetName ).not.be.equal( "undefined" );
						Should( entryWithSetName.get( 'name' ) ).be.equal( entries[ 1 ].name );
						Should( entryWithSetName.get( 'uri' ) ).be.equal( `/webhook/${entries[ 1 ].uri}` );
						Should( entryWithSetName.get( 'method' ) ).be.equal( entries[ 1 ].method );
						Should( entryWithSetName.get( 'description' ) ).be.equal( entries[ 1 ].description );
						Should( entryWithSetName.get( 'options' ).pipe ).be.equal( entries[ 1 ].options.pipe );
						Should( entryWithSetName.get( 'options' ).content_type ).be.equal( entries[ 1 ].options.content_type );
						Should( entryWithSetName.get( 'options' ).x_hub_signature ).be.equal( entries[ 1 ].options.x_hub_signature );
						Should( entryWithSetName.get( 'options' ).secret ).be.equal( entries[ 1 ].options.secret );
						done();
					})
					.catch( ( error: any ) => {
						done( error );
					})
			});
		});
	});
});