const Path = require( 'path' );

class Environment{

	projectRoot: string;

	constructor(){
		this.checkProjectRoot();
	}

	checkProjectRoot(): void{
		let args: string[] = process.argv;
		let scriptPath: string = args[1];
		let projectRoot: string = Path.resolve( Path.join( scriptPath, '..', '..', '..' ) );
		this.projectRoot = projectRoot;
	}

}

const environment: Environment = new Environment();
export default environment;