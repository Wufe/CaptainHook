const uuid = require( 'uuid/v4' );
import * as Moment from 'moment';
import {MessageType} from '.';

export interface Command{
	id: string;
	message: string;
	type: MessageType;
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
		return ( message: string, type: MessageType ) => {
			let id = uuid();
			let timestamp = Moment().unix().toString();//( Moment() ).format( 'ddd, DD MMM YYYY - HH:mm:ss' );
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