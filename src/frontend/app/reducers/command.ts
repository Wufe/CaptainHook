import {Action} from '../actions';
import {Command as CommandStateInterface, command as commandStateInitial} from '../states';
import {COMMANDS_FETCH, COMMANDS_FETCH_FAILED, COMMANDS_FETCH_SUCCEEDED} from '../constants';

export default ( state: CommandStateInterface = commandStateInitial, action: Action<CommandStateInterface> ): CommandStateInterface => {
	let {type, payload, error} = action;
	switch( type ){
		case COMMANDS_FETCH_SUCCEEDED:
			if( payload.data.result == 'success' )
				return Object.assign({}, state, {
					snapshot: payload.data.snapshot,
					commands: [...state.commands, ...payload.data.payload]
				});
			return state;
	}
	return state;
};