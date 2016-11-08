import * as Actions from './actions';
import {Action} from '.';
import {Environment} from '../chook';

export class Dispatcher{

	constructor(){
		this.dispatch = this.dispatch.bind( this );
	}

	dispatch(): void{
		let args: any = Environment.get( 'args' );
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