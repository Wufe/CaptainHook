declare let require: any;
declare let process: any;
const Path = require( 'path' );
const Fs = require( 'fs' );

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
		let isMocha: boolean = process.env.NODE_ENV == 'mocha';
		let isCircleCI: boolean = process.env.NODE_ENV == 'circleci';
		let args: string[] = process.argv;
		let scriptPath: string = args[1];
		let realPath = Fs.realpathSync( scriptPath );
		if( isMocha ){
			this.buildDirectory = Path.resolve( Path.join( Path.dirname( realPath ), '..', '..', '..', 'build' ) );
		}else if( isCircleCI ){
			this.buildDirectory = Path.resolve( Path.join( 'home', 'ubuntu', 'CaptainHook', 'build' ) );
		}else{
			this.buildDirectory = Path.resolve( Path.join( Path.dirname( realPath ), '..' ) );
		}
		
	}

}

const environment: Environment = new Environment();
export default environment;