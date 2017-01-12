import {ICommand} from './ICommand';
import {Args} from '.';

export class CommandParser{

	protected args: Args;
	protected commands: ICommand[] = [];

	constructor( args: Args ){
		this.args = args;
	}

	parseCommand(){
		let command: ICommand = this.findRequestedCommand();
		if( !command )
			throw new Error( `Command not implemented.` );
		command.execute( this.args );
	}

	private findRequestedCommand(): ICommand{
		let argsKeys = Object.keys( this.args );
		if( argsKeys.length == 0 )
			return null;
		let firstArg: string = argsKeys[ 0 ];
		let action = this.args[ firstArg ];
		for( let key in this.commands ){
			if( this.commands[ key ].match( action ) )
				return this.commands[ key ];
		}
		return null;
	}

	protected pruneArgs( originalArgs: Args ): Args{
		let args: Args = Object.assign( {}, originalArgs );
		let argsKeys = Object.keys( this.args );
		if( argsKeys.length == 0 )
			return null;
		let firstArg: string = argsKeys[ 0 ];
		delete args[ firstArg ];
		return args;
	}

	protected getFirstArgKey( args: Args ): string{
		let argsKeys = Object.keys( this.args );
		if( argsKeys.length == 0 )
			return null;
		return argsKeys[ 0 ];
	}

	protected getFirstArgValue( args: Args ): any{
		let firstArgKey = this.getFirstArgKey( args );
		if( !firstArgKey )
			return null;
		return args[ firstArgKey ];
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

};