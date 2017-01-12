import {Args} from '.';

export interface ICommand{

	execute( args: Args ): void;
	match( action: string ): boolean;

}