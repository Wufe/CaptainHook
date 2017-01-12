/// <reference path="../../typings/index.d.ts" />

import * as Should from 'should';
import {Args, Command, CommandParser, Dispatcher} from '../../src/core/cli';
import {Get as ConfigGet} from '../../src/core/cli/commands/config/Get';
import {Set as ConfigSet} from '../../src/core/cli/commands/config/Set';
import {Create as EntryCreate} from '../../src/core/cli/commands/entry/Create';
import {Read as EntryRead} from '../../src/core/cli/commands/entry/Read';
import {Update as EntryUpdate} from '../../src/core/cli/commands/entry/Update';
import {Delete as EntryDelete} from '../../src/core/cli/commands/entry/Delete';
import {List as EntryList} from '../../src/core/cli/commands/entry/List';
import {Start as ServerStart} from '../../src/core/cli/commands/server/Start';
import {Status as ServerStatus} from '../../src/core/cli/commands/server/Status';
import {Stop as ServerStop} from '../../src/core/cli/commands/server/Stop';
import {Add as TaskAdd} from '../../src/core/cli/commands/task/Add';
import {Delete as TaskDelete} from '../../src/core/cli/commands/task/Delete';

const commands = [
	{
		command: 'config get "*"',
		class: ConfigGet,
		args: {
			action: 'config',
			configAction: 'get',
			key: '*'
		}
	},
	{
		command: 'config set port 2556',
		class: ConfigSet,
		args: {
			action: 'config',
			configAction: 'set',
			key: 'port',
			value: '2556'
		}
	},
	{
		command: 'create',
		class: EntryCreate,
		args: {
			action: 'create'
		}
	},
	{
		command: 'read',
		class: EntryRead,
		args: {
			action: 'read',
			id: 1
		}
	},
	{
		command: 'update',
		class: EntryUpdate,
		args: {
			action: 'update',
			id: 1,
			name: 'a_name',
			uri: 'a_uri',
			description: 'a_description',
			method: 'patch',
			pipe: true,
			content_type: 'application/json',
			x_hub_signature: true,
			secret: 'notsosecret'
		}
	},
	{
		command: 'delete',
		class: EntryDelete,
		args: {
			action: 'delete',
			id: 1
		}
	},
	{
		command: 'list',
		class: EntryList,
		args: {
			action: 'list'
		}
	},
	{
		command: 'entry create',
		class: EntryCreate,
		args: {
			action: 'entry',
			entryAction: 'create'
		}
	},
	{
		command: 'entry read',
		class: EntryRead,
		args: {
			action: 'entry',
			entryAction: 'read',
			id: 1
		}
	},
	{
		command: 'entry update',
		class: EntryUpdate,
		args: {
			action: 'entry',
			entryAction: 'update',
			id: 1,
			no_pipe: true,
			no_x_hub_signature: true,
			no_secret: true
		}
	},
	{
		command: 'entry delete',
		class: EntryDelete,
		args: {
			action: 'entry',
			entryAction: 'delete',
			id: 1
		}
	},
	{
		command: 'entry list',
		class: EntryList,
		args: {
			action: 'entry',
			entryAction: 'list'
		}
	},
	{
		command: 'start',
		class: ServerStart,
		args: {
			action: 'start',
			attached: true,
			quiet: true,
			gui: true,
			debug: true,
			development: true
		}
	},
	{
		command: 'status',
		class: ServerStatus,
		args: {
			action: 'status'
		}
	},
	{
		command: 'stop',
		class: ServerStop,
		args: {
			action: 'stop'
		}
	},
	{
		command: 'task add 1',
		class: TaskAdd,
		args: {
			action: 'task',
			taskAction: 'add',
			entry_id: 1
		}
	},
	{
		command: 'task delete 1',
		class: TaskDelete,
		args: {
			action: 'task',
			taskAction: 'delete',
			entry_id: 1
		}
	}
];

describe( `CLI`, () => {
	describe( `Dispatcher`, () => {
		commands.forEach( ( command ) => {
			describe( `${command.command}`, () => {
				let execute: any;
				before( () => {
					execute = command.class.prototype.execute;
				});
				it( `should work`, ( done: ( error?: any ) => void ) => {
					command.class.prototype.execute = () => { done() };
					let dispatcher = new Dispatcher( command.args );
					dispatcher.parseCommand();
				});
				after( () => {
					command.class.prototype.execute = execute;
				});
			});
		});
	});
});