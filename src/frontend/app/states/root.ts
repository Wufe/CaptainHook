import {App} from './app';
import {Entries} from './entry';
import {Command} from './command';

export type State = {
	app: App,
	entries: Entries,
	command: Command
};