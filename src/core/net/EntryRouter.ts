import {CommandManager, EntryModel, EntryRepository, ExpressCall, Log, RequestResolver, RequestResolverRepository} from '../chook';
import {Server} from '.';

import {Request, Response, NextFunction, RequestHandler} from 'express';
import {red} from 'chalk';

export default class EntryRouter{

	server: Server;
	entryRepository: EntryRepository;
	requestResolverRepository: RequestResolverRepository;
	commandManager: CommandManager;

	constructor( server: Server, entryRepository: EntryRepository, commandManager: CommandManager ){
		this.handler = this.handler.bind( this );
		this.server = server;
		this.entryRepository = entryRepository;
		this.requestResolverRepository = new RequestResolverRepository();
		this.commandManager = commandManager;
	}
	
	setup(): void{
		this.entryRepository
			.loadEntries()
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

	answerCall( entry: EntryModel, expressCall: ExpressCall ): void{
		entry.loadTasks()
			.then( ( entry: EntryModel ) => {
				this.requestResolverRepository.create( entry, expressCall, this.commandManager.getLogHandler() );
			})
			.catch( ( error: any ) => {
				Log( 'error', red( error.message ), error );
			});
	}

}