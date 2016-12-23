import {App} from './app';
import {Entries} from './entry';
import {Command} from './command';
import {Routing} from './routing';

export type State = {
	app: App;
	entries: Entries;
	command: Command;
	routing?: Routing;
};