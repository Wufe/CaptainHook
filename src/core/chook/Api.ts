/// <reference path="../../../typings/index.d.ts" />

import {Server} from '../net';
import {EntryRepository, EntryModel} from '.';
import {Request, Response, NextFunction} from 'express';

const API_URI = `/api`;

export default class Api{

	server: Server;

	constructor( server: Server ){
		this.server = server;
	}

	setup(){
		this.server.express.get( `${API_URI}/entry`, ( request, response ) => {
			let entryRepository: EntryRepository = new EntryRepository();
			entryRepository
				.loadEntries()
				.then( ( entries: EntryModel[] ) => {
					return entryRepository.loadTasks( entries );
				})
				.then( ( entries: any[] ) => {
					response.json(
						entries.map( ( entry: EntryModel ) => {
							let tasks: any[] = entry.getTasks();
							tasks = tasks.map( ( task ) => {
								return task.get();
							});
							let result: any = entry.get();
							let options: any = Object.assign({}, entry.get( 'options' ) );
							delete options[ 'secret' ];
							result.options = options;
							//result.tasks = tasks;
							return result;
						})
					);
				})
				.catch( ( error: any ) => {
					response.status( 500 ).send( error.message );
				});
		});
	}

}