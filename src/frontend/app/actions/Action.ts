interface Action<T>{
	type: string;
	payload: T | any;
	error?: boolean;
	meta?: any;
}

export default Action;