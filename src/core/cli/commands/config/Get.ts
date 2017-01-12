import {Command, ICommand} from '../..';
import {Args} from '../..';

import {getPathFromKey} from './ConfigurationStringUtils';
import {Configuration} from '../../../chook';

export class Get extends Command implements ICommand{

	constructor( args: Args ){
		super( args );
		this.action = "get";
	}

	execute( args: Args ): void{
		let key: string = args[ 'key' ];
		if( key == "*" ){
			console.log( Configuration.get() );
			return;
		}
		let keys = getPathFromKey( key );
		console.log( Configuration.get( ...keys ) );
	}

}