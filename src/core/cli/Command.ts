import {Args} from '.';

export class Command{

	protected args: Args;

	constructor( args: Args ){
		this.args = args;
	}

	protected action: string;
	protected actions: string[];

	public match( action: string ): boolean{
		if( this.action ){
			if( action == this.action )
				return true;
		}
		if( this.actions ){
			return this.actions.indexOf( action ) > -1;
		}
		return false;
	}
}