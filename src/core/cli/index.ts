import Action from './actions/Action';
import Creator from './Creator';
import Cli from './Cli';

export * from './CommandParser';
export * from './Command';
export * from './Dispatcher';
export * from './ICommand';
export * from './ICommandParser';

export {
	Action,
	Creator,
	Cli
};

export type Args = { [key: string]: any };
export default Cli;