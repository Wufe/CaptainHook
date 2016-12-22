const uuid = require( 'uuid/v4' );
import * as Moment from 'moment';

export interface Command{
	id: string;
	message: string;
	type: 'log' | 'error' | 'head';
	timestamp: string;
}

export default class CommandManager{

	commands: Command[] = [];
	commandMap: {
		[id: string]: number;
	} = {};

	constructor(){
		this.getLogHandler = this.getLogHandler.bind( this );
	}

	getLogHandler(){
		return ( message: string, type: 'log' | 'error' | 'head' ) => {
			let id = uuid();
			let timestamp = ( Moment() ).format( 'ddd, DD MMM YYYY - HH:mm:ss' );
			let command: Command = {
				id,
				message,
				type,
				timestamp
			}
			let commandsLength = this.commands.push( command );
			let commandIndex = commandsLength -1;
			this.commandMap[ id ] = commandIndex;
		};
	}
}