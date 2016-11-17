export interface Notification{
	id: number | string;
	text: string;
}

export interface App{
	loading: boolean;
	notifications: Notification[]
}

export const app: App = {
	loading: false,
	notifications: []
};