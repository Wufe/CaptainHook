/// <reference path="../../../typings/index.d.ts" />

import {Creator} from '../actors';

export interface AccessInterface<T>{
	byId: ( identifier?: number | string, options?: any ) => Promise<T>;
	one: ( options? : any ) => Promise<any>;
	all: ( options? : any ) => Promise<any[]>;
}

export default class Access<T>{

	actor: any;
	model: any;

	constructor( actor: any, model: any ){
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

	findById( identifier?: number | string, options?: any ) : Promise<T>{
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

	findOne( options? : any ) : Promise<any>{
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

	findAll( options? : any ) : Promise<any[]>{
		return new Promise<any[]>( ( resolve, reject ) => {
			this
				.model
				.findAll( options )
				.then( ( instances: any[] ) => {
					resolve( instances.map( ( instance: any ) => {
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