/// <reference path="../../../typings/index.d.ts" />

import {Server} from '../net';
import {CommandManager, EntryRepository, EntryModel} from '.';
import {Request, Response, NextFunction} from 'express';

const API_URI = `/api`;
const LOG_LINES_LIMIT = 10;
const LOG_CHECK_TIMEOUT = 2000;
const LOG_CHECK_MAX_ITERATION = 10;

export default class Api{

	server: Server;
	commandManager: CommandManager

	constructor( server: Server, commandManager: CommandManager ){
		this.server = server;
		this.commandManager = commandManager;
	}


	setup(){
		this.server.express.get( `${API_URI}/log`, ( request, response ) => {
			this.sendLogs( request, response );
		});
		this.server.express.get( `${API_URI}/entry`, ( request, response ) => {
			let entryRepository: EntryRepository = new EntryRepository();
			entryRepository
				.loadEntries()
				.then( ( entries: EntryModel[] ) => {
					return entryRepository.loadTasks( entries );
				})
				.then( ( entries: any[] ) => {
					response.json(
						{
							result: 'success',
							snapshot: '',
							payload: entries.map( ( entry: EntryModel ) => {
								let tasks: any[] = entry.getTasks();
								tasks = tasks.map( ( task ) => {
									return task.get();
								});
								let result: any = entry.get();
								let options: any = Object.assign({}, entry.get( 'options' ) );
								delete options[ 'secret' ];
								result.options = options;
								return result;
							})
						}
					);
				})
				.catch( ( error: any ) => {
					response.status( 500 ).send( error.message );
				});
		});
	}

	sendLogs( request: Request, response: Response, iteration: number = 0 ){
		let {commands, commandMap} = this.commandManager;
		let {query} = request;
		let startingIndex = -1;
		if( query && query.snapshot ){
			let {snapshot} = query;
			let lastID = commandMap[snapshot];
			if( lastID !== undefined )
				startingIndex = lastID;
		}
		let sendingCommands: any[] = [];
		let index = startingIndex+1;
		let lastSnapshot: string;
		if( commands[ index ] ){
			for( let i = index; i < commands.length && i < index + LOG_LINES_LIMIT; ++i ){
				sendingCommands.push( commands[ i ] );
				lastSnapshot = commands[ i ].id;
			}
		}
		if( sendingCommands.length > 0 ){
			response.json({
				result: 'success',
				snapshot: lastSnapshot,
				payload: sendingCommands
			});
		}else{
			setTimeout(() => {
				if( iteration < LOG_CHECK_MAX_ITERATION ){
					this.sendLogs( request, response, iteration+1 );
				}else{
					response.status( 200 ).json({
						result: 'fail',
						payload: []
					})
				}
			}, LOG_CHECK_TIMEOUT );
		}
	}

}