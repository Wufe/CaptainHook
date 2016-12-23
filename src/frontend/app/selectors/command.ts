import {State, Command, Commands} from '../states';
import {createSelector} from 'reselect';
import {unix} from 'moment';

export type EnhancedCommandObject = {
	id: string;
	message: string;
	messages: string[];
	type: string;
	timestamp: string;
}

export type EnhancedCommand = {
	snapshot: string;
	commands: EnhancedCommandObject[];
}

const getCommandState = ( state: State ) => state.command;

export const commandsToFormattedCommands = createSelector<State, EnhancedCommand, Command>(
	getCommandState,
	( commandState: Command ) => {
		let commands: EnhancedCommandObject[] = <EnhancedCommandObject[]>[ ...commandState.commands ];
		let enhancedCommand: EnhancedCommand = Object.assign({}, commandState, {
			commands: commands.map( ( command ) => {
				return Object.assign({}, command, {
					timestamp: unix( parseInt( command.timestamp ) ).format( 'ddd, DD/MMM/YYYY - HH:mm:ss' ),
					messages: command.message.split( '\n' )
				});
			})
		});
		return enhancedCommand;
	}
);