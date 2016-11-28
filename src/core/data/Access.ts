/// <reference path="../../../typings/index.d.ts" />

import * as Sequelize from 'sequelize';

import {Creator} from '../actors';

export interface AccessInterface<T>{
	byId: ( identifier?: number | string, options?: Sequelize.FindOptions ) => Promise<T>;
	one: ( options? : Sequelize.FindOptions ) => Promise<any>;
	all: ( options? : Sequelize.FindOptions ) => Promise<any[]>;
}

export default class Access<T>{

	actor: any;
	model: Sequelize.Model<any, any>;

	constructor( actor: any, model: Sequelize.Model<any, any> ){
		this.actor = actor,
		this.model = model;
	}

	getInterface(): AccessInterface<T>{
		return {
			byId: this.findById.bind( this ),
			one: this.findOne.bind( this ),
			all: this.findAll.bind( this )
		};
	}

	findById( identifier?: number | string, options?: Sequelize.FindOptions ) : Promise<T>{
		return new Promise<T>( ( resolve, reject ) => {
			this.model.findById( identifier, options )
				.then( ( instance: any ) => {
					resolve( this.getActorByInstance( instance ) );
				})
				.catch( ( error: any ) => {
					reject( error );
				});
		});
		
	}

	findOne( options? : Sequelize.FindOptions ) : Promise<any>{
		return new Promise<T>( ( resolve, reject ) => {
			this.model.findOne( options )
				.then( ( instance: any ) => {
					resolve( this.getActorByInstance( instance ) );
				})
				.catch( ( error: any ) => {
					reject( error );
				});
		})
	}

	findAll( options? : Sequelize.FindOptions ) : Promise<any[]>{
		return new Promise<any[]>( ( resolve, reject ) => {
			this
				.model
				.findAll( options )
				.then( ( instances: Sequelize.Instance<any>[] ) => {
					resolve( instances.map( ( instance: Sequelize.Instance<any> ) => {
						return this.getActorByInstance( instance );
					}));
				})
				.catch( ( error: any ) => {
					reject( error );
				});
		})
	}

	getActorByInstance( instance: any ): any{
		let creator: Creator = new Creator( this.actor );
		let actor: any = creator.makeFromDataInstance( instance );
		return actor;
	}
}