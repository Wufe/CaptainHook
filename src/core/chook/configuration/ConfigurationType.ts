interface ConfigurationContentType{
	gui: boolean;
	debug: boolean;
	server: {
		hostname: string;
		port: number;
	};
	security: {
		jwt: {
			secret: string;
			expiration_hours: number;
		};
		token: string;
	};
}

interface ConfigurationType{
	store: "memory" | "file";
	filename: string;
	directory: string;
	filepath: string;
	content: ConfigurationContentType;
}

export {
	ConfigurationContentType,
	ConfigurationType
}