import * as Actions from './actions';
import {Action} from '.';
import {Environment, getEnvironment} from '../chook';

export class Dispatcher{

	environment: Environment;

	constructor(){
		this.environment = getEnvironment();
		this.dispatch = this.dispatch.bind( this );
	}

	dispatch(): void{
		let args: any = this.environment.get( 'args' );
		if( !args )
			return;
		if( !args[ 'action' ] )
			return;
		let availableActions: any = Actions;
		for( let actionName in Actions ){
			let action: Action = <Action>(availableActions[ actionName ]);
			if( action.matches( args[ 'action' ] ) ){
				action.run();
			}
		}
	}

}

const dispatcher: Dispatcher = new Dispatcher();
const dispatch = dispatcher.dispatch;

export{
	dispatch
};