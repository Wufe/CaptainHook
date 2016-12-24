import {dirname} from 'path';
import {getEnvironment, getBuildDirectory, getProjectRoot} from './chook/Environment';
import Cli from './cli';

export default class Entrypoint{

	constructor( scriptDir: string ){
		getEnvironment( dirname( scriptDir ) );
	}

	cli(){
		new Cli().run();
	}

}