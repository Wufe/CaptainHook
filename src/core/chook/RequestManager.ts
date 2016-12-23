import {EntryModel, ExpressCall, RequestResolver, MessageType} from '.';

export default class RequestManager{

	resolvers: RequestResolver[] = [];

	constructor(){}

	create( entry: EntryModel, expressCall: ExpressCall, ...logHandlers: (( message: string, type?: MessageType ) => void)[] ): RequestResolver{
		let requestResolver: RequestResolver = new RequestResolver( entry, expressCall );
		logHandlers.forEach( ( logHandler ) => {
			requestResolver.registerLogHandler( ( message: string, type: MessageType = 'log' ) => {
				logHandler( message, type );
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