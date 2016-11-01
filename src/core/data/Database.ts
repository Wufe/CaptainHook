/// <reference path="../../../typings/globals/node/index.d.ts" />
/// <reference path="../../../typings/globals/sequelize/index.d.ts" />

import Environment from '../chook/Environment';

import * as Models from './models';
import * as Path from 'path';
import * as Sequelize from 'sequelize';

export class Database{

	sequelize: Sequelize.Sequelize;
	models: any = {};

	constructor(){
		this.setupDatabaseConnection();
		this.setupModelDefinitions();
	}

	setupDatabaseConnection(): void{
		let databaseFilePath = Path.join( Environment.buildDirectory, 'resources', 'database.sqlite' );
		this.sequelize = new Sequelize( null, null, null, {
			dialect: 'sqlite',
			storage: databaseFilePath
		});
	}

	setupModelDefinitions(): void{
		let availableModels: any;
		availableModels = Models;
		for( let key in availableModels ){
			let modelName: string = key;
			this.models[ modelName ] = this.sequelize.define(
				modelName,
				availableModels[ modelName ]( Sequelize )
			);
		}
	}

}

const database: Database = new Database();
const models = database.models;
export {
	database,
	models
}
export default database;