import {CommandManager, EntryModel, EntryManager, ExpressCall, Log, MessageType, RequestResolver, RequestManager} from '../chook';
import {Server} from '.';

import {Request, Response, NextFunction, RequestHandler} from 'express';
import {red} from 'chalk';

export default class EntryRouter{

	server: Server;
	entryManager: EntryManager;
	requestManager: RequestManager;
	commandManager: CommandManager;

	constructor( server: Server, entryManager: EntryManager, commandManager: CommandManager ){
		this.handler = this.handler.bind( this );
		this.server = server;
		this.entryManager = entryManager;
		this.requestManager = new RequestManager();
		this.commandManager = commandManager;
	}
	
	setup(): void{
		this.entryManager
			.getEntries()
			.then( ( entries: EntryModel[] ) => {
				this.setupRoutes( entries );
			})
			.catch( ( error: any ) => {
				Log( 'error', red( error.message ), error );
			})
	}

	setupRoutes( entries: EntryModel[] ): void{
		let {express} = this.server;
		entries.forEach( ( entry: EntryModel ) => {
			let {id, method, uri} = entry.get();
			switch( method ){
				case "get":
					express.get( uri, this.handler( entry ) );
					break;
				case "post":
					express.post( uri, this.handler( entry ) );
					break;
				case "put":
					express.put( uri, this.handler( entry ) );
					break;
				case "patch":
					express.patch( uri, this.handler( entry ) );
					break;
				case "delete":
					express.delete( uri, this.handler( entry ) );
					break;
			}
			Log( 'debug', `Setup entry #${id} ${method.toUpperCase()} ${uri}.` );
		});
	}

	handler( entry: EntryModel ): RequestHandler{
		return ( request: Request, response: Response, next: NextFunction ) => {
			this.answerCall( entry, { request, response, next });	
		};
	}

	getConsoleLogHandler(){
		return ( message: string, type?: MessageType ) => {
			switch( type ){
				case 'log':
					Log( 'info', message );
					break;
				case 'error':
					Log( 'error', message );
					break;
				case 'command':
					Log( 'notice', message );
					break;
			}
		};
	}

	answerCall( entry: EntryModel, expressCall: ExpressCall ): void{
		entry.loadTasks()
			.then( ( entry: EntryModel ) => {
				this.requestManager.create( entry, expressCall, this.commandManager.getLogHandler(), this.getConsoleLogHandler() );
			})
			.catch( ( error: any ) => {
				Log( 'error', red( error.message ), error );
			});
	}

}