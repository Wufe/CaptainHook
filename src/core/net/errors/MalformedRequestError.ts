export default class MalformedRequestError extends Error{

	constructor( message?: string ){
		super( message );
	}

}