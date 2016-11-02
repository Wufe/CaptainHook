/// <reference path="../../../typings/index.d.ts" />
/// <reference path="../../../node_modules/@types/core-js/index.d.ts" />

import * as Sequelize from 'sequelize';

export default class Actor<T>{

	static model: Sequelize.Model<any, any>;
	data: any;

	constructor( data: any ){
		this.data = data;
	}

	get( key: string ): any{
		return this.data[ key ];
	}

	set( key: string, value: any ): void{
		this.data[ key ] = value;
	}

	save(): Promise<void>{
		return Actor.model.create( this.data );
	}

	static findById( identifier?: number | string, options?: Sequelize.FindOptions ) : Promise<any>{
		return Actor.model.findById( identifier, options );
	}

	static findOne( options? : Sequelize.FindOptions ) : Promise<any>{
		return Actor.model.findOne( options );
	}

	static findAll( options? : Sequelize.FindOptions ) : Promise<any>{
		return Actor.model.findAll( options );
	}

}