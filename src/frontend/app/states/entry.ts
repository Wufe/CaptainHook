export interface Entry{
	name: string;
	uri: string;
	description: string;
	method: string;
	created_at: string;
	options: {
		pipe: boolean;
		content_type: string;
		x_hub_signature: boolean;
	}
}

export interface Entries{
	[id: number]: Entry;
};

export const entries: Entries = {};