const serverCommands: any[] = [
	{
		id: "start",
		aliases: [ "s" ],
		addHelp: true,
		help: "Starts hook and frontend server.",
		args: [
			{
				id: [ "--attached" ],
				help: "Start the server attached to the cli process.",
				nargs: 0,
				action: "storeTrue",
				defaultValue: false
			},
			{
				id: [ "--quiet" ],
				help: "Suppress output.",
				nargs: 0,
				action: "storeTrue",
				defaultValue: false
			},
			{
				id: [ "--gui" ],
				help: "Start gui ignoring configuration directives.",
				nargs: 0,
				action: "storeTrue",
				defaultValue: false
			},
			{
				id: [ "--debug" ],
				help: "Debug messages.",
				nargs: 0,
				action: "storeTrue",
				defaultValue: false
			},
			{
				id: "--development",
				aliases: [ "--dev" ],
				help: "Development mode (HMR enabled).",
				nargs: 0,
				action: "storeTrue",
				defaultValue: false
			}
		]
	},
	{
		id: "stop",
		addHelp: true,
		help: "Stops the server.",
		args: [
			{
				id: [ "--quiet" ],
				help: "Suppress output.",
				nargs: 0,
				action: "storeTrue",
				defaultValue: false
			}
		]
	},
	{
		id: "status",
		addHelp: true,
		help: "Print the application status."
	}
];

const configCommands: any[] = [
	{
		id: "configuration",
		aliases: [ "config", "conf" ],
		addHelp: true,
		help: "Get and set configuration values.",
		sub: {
			title: "Configuration",
			dest: "configAction",
			commands: [
				{
					id: "get",
					addHelp: true,
					help: "Get configuration value.",
					args: [
						{
							id: "key",
							action: "store"
						}
					]
				},
				{
					id: "set",
					addHelp: true,
					help: "Set configuration value.",
					args: [
						{
							id: "key",
							action: "store"
						},
						{
							id: "value",
							action: "store"
						}
					]
				}
			]
		}
	}
];

const entryModelArgs: any[] = [
	{
		id: "--name",
		action: "store",
		defaultValue: null
	},
	{
		id: "--uri",
		action: "store",
		defaultValue: null
	},
	{
		id: "--description",
		action: "store",
		defaultValue: null
	},
	{
		id: "--method",
		action: "store",
		defaultValue: "post",
		help: 'The HTTP method.'
	},
	{
		id: "--pipe",
		action: "storeTrue",
		nargs: 0,
		defaultValue: false,
		help: "Pipe the tasks' responses to the http response."
	},
	{
		id: "--content-type",
		action: "store",
		defaultValue: "text/plain",
		help: "Set the content-type of the http response."
	},
	{
		id: "--x-hub-signature",
		action: "storeTrue",
		nargs: 0,
		defaultValue: false,
		help: "Verify the x-hub-signature. Requires --secret parameter to be set."
	},
	{
		id: "--secret",
		action: "store",
		defaultValue: null,
		help: "The secret required for the verification process."
	}
];

const entryCommands: any[] = [
	{
		id: "list",
		aliases: [ "ls", "l" ],
		addHelp: true,
		help: "List all entries."
	},
	{
		id: "create",
		aliases: [ "c" ],
		addHelp: true,
		help: "Create an entry.",
		args: entryModelArgs
	},
	{
		id: "read",
		aliases: [ "r", "show", "s" ],
		addHelp: true,
		help: "Get a single entry by id.",
		args: [
			{
				id: "id",
				action: "store"
			}
		]
	},
	{
		id: "update",
		aliases: [ "u" ],
		addHelp: true,
		help: "Update an entry specifying which field to change.",
		args: [
			{
				id: "id",
				action: "store"
			},
			...entryModelArgs,
			{
				id: "--no-pipe",
				action: "storeTrue",
				nargs: 0,
				defaultValue: false,
				help: "Disable the 'pipe' option."
			},
			{
				id: "--no-x-hub-signature",
				action: "storeTrue",
				nargs: 0,
				defaultValue: false,
				help: "Disable the 'x-hub-signature' option."
			},
			{
				id: "--no-secret",
				action: "storeTrue",
				nargs: 0,
				defaultValue: false,
				help: "Remove the 'secret' option."
			}
		]
	},
	{
		id: "delete",
		aliases: [ "del", "d" ],
		addHelp: true,
		help: "Delete an entry by its id.",
		args: [
			{
				id: "id",
				action: "store"
			}
		]
	}
];

const taskCommands: any[] = [
	{
		id: "task",
		aliases: [ "t" ],
		addHelp: true,
		help: "Add, update or delete task of a given entry.",
		sub: {
			title: "Task",
			dest: "taskAction",
			commands: [
				{
					id: "add",
					aliases: [ "create", "c", "a" ],
					args: [
						{
							id: "entry_id",
							action: "store",
							help: "The id of the entry. It can be the numeric id or the name.",
							addHelp: true
						},
						{
							id: "--environment",
							action: "append",
							defaultValue: [],
							help: "Environment variable for the task."
						}
					]
				},
				{
					id: "delete",
					aliases: [ "del", "d" ],
					args: [
						{
							id: "task_id",
							action: "store",
							help: "The id of the entry. It can be the numeric id or the name.",
							addHelp: true
						}
					]
				}
			]
		}
	}
];

const getCommands: any = function(){
	return {
		title: "Actions",
		dest: "action",
		commands: [
			...serverCommands,
			...configCommands,
			...entryCommands,
			{
				id: "entry",
				addHelp: true,
				aliases: [ "e", "entries" ],
				help: "Get and set entries.",
				sub: {
					title: "Entry",
					dest: "entryAction",
					commands: [
						...entryCommands
					]
				}
			},
			...taskCommands
		]
	}
};

export default getCommands;