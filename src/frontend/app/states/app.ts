export interface Notification{
	id: number | string;
	text: string;
}

export interface Auth{
	logging: boolean;
	logged: boolean;
	token?: string;
	error?: any;
}

export interface App{
	loading: boolean;
	notifications: Notification[],
	auth: Auth
}

export const app: App = {
	loading: false,
	notifications: [],
	auth: {
		logging: false,
		logged: false,
		error: null
	}
};