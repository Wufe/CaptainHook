export interface CommandObject{
	id: string;
	message: string;
	type: string;
	timestamp: string;
}

export type Commands = CommandObject[];

export type Command = {
	snapshot: string;
	commands: Commands;
};
export const command: Command = {
	snapshot: '',
	commands: []
};