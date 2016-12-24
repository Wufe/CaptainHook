/// <reference path="../../../typings/index.d.ts" />

import * as ArgParse from 'argparse';
import {ArgumentParser} from 'argparse';

import {Creator, dispatch} from '.';
import {Environment, getEnvironment, logInstance} from '../chook';

export default class Cli{

	argumentParser: ArgumentParser;
	environment: Environment;

	constructor(){
		this.environment = getEnvironment();
	}

	setup(): void{
		let creator: Creator = new Creator();
		this.argumentParser = creator.createArgumentParser();
	}

	parseArgs(): void{
		this.environment.set( this.argumentParser.parseArgs(), 'args' );
		logInstance.setup();
	}

	run(){
		this.setup();
		this.parseArgs();
		dispatch();
	}

}