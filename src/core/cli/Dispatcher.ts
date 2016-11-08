import * as Actions from './actions';
import {Environment} from '../chook';

export class Dispatcher{

	constructor(){
		this.dispatch = this.dispatch.bind( this );
	}

	dispatch(): void{
		let args: any = Environment.get( 'args' );
		if( !args )
			return;
		if( !args.action )
			return;
	}

}

const dispatcher: Dispatcher = new Dispatcher();
const dispatch = dispatcher.dispatch;

export{
	dispatch
};