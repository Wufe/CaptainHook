const Path = require( 'path' );
const fs = require( 'fs' );

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
		let realPath = fs.realpathSync( scriptPath );
		this.buildDirectory = Path.resolve( Path.join( Path.dirname( realPath ), '..' ) );
	}

}

const environment: Environment = new Environment();
export default environment;