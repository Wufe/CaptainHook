import {EntryModel, ExpressCall, RequestResolver} from '.';

export default class RequestResolverRepository{

	resolvers: RequestResolver[] = [];

	constructor(){}

	create( entry: EntryModel, expressCall: ExpressCall, ...logHandlers: (( message: string, type?: 'log' | 'error' ) => void)[] ): RequestResolver{
		let requestResolver: RequestResolver = new RequestResolver( entry, expressCall );
		logHandlers.forEach( ( logHandler ) => {
			requestResolver.registerLogHandler( ( message: string ) => {
				logHandler( message, 'log' );
			});
			requestResolver.registerErrorHandler( ( message: string ) => {
				logHandler( message, 'error' );
			});
		});
		this.resolvers.push( requestResolver );
		requestResolver.run();
		return requestResolver;
	}

	getAll(): RequestResolver[]{
		return this.resolvers;
	}

}