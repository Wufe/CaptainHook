import {Command} from '../../Command';
import {ICommand} from '../../ICommand';
import {Args} from '../..';

import {getPathFromKey} from './ConfigurationStringUtils';
import {Configuration} from '../../../chook';

export class Set extends Command implements ICommand{

	constructor( args: Args ){
		super( args );
		this.action = "set";
	}

	execute( args: Args ): void{
		let keys = getPathFromKey( args[ "key" ] );
		Configuration.set( args[ "value" ], ...keys );
	}

}