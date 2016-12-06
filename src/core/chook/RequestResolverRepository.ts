import {EntryModel, ExpressCall, RequestResolver} from '.';

export default class RequestResolverRepository{

	resolvers: RequestResolver[] = [];

	constructor(){}

	create( entry: EntryModel, expressCall: ExpressCall ): RequestResolver{
		let requestResolver: RequestResolver = new RequestResolver( entry, expressCall );
		this.resolvers.push( requestResolver );
		requestResolver.run();
		return requestResolver;
	}

	getAll(): RequestResolver[]{
		return this.resolvers;
	}

}