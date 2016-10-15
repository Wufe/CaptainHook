const Path = require( 'path' );

class Environment{

	projectRoot: string;
	buildDirectory: string;

	constructor(){
		this.checkBuildDirectory();
		this.checkProjectRoot();
	}

	checkProjectRoot(): void{
		let projectRoot: string = Path.resolve( Path.join( this.buildDirectory, '..' ) );
		this.projectRoot = projectRoot;
	}

	checkBuildDirectory(): void{
		let args: string[] = process.argv;
		let scriptPath: string = args[1];
		this.buildDirectory = Path.resolve( Path.join( scriptPath, '..', '..' ) );
	}

}

const environment: Environment = new Environment();
export default environment;