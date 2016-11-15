declare module "react-hot-loader"{
	import * as React from "react";
	
	interface ErrorReporterProps {
		error: any
	}

	export interface AppContainerProps {
		children?: React.ReactElement<any>,
		errorReporter?: React.ComponentClass<ErrorReporterProps> | React.StatelessComponent<ErrorReporterProps>
	}

	export class AppContainer extends React.Component<AppContainerProps, {}> {}
}