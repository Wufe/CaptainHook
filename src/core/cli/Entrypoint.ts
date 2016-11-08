/// <reference path="../../../typings/index.d.ts" />

import * as ArgParse from 'argparse';
import {ArgumentParser} from 'argparse';

import {Creator, dispatch} from '.';
import {Environment} from '../chook';

export default class Entrypoint{

	argumentParser: ArgumentParser;
	constructor(){}

	setup(): void{
		let creator: Creator = new Creator();
		this.argumentParser = creator.createArgumentParser();
	}

	parseArgs(): void{
		Environment.set( this.argumentParser.parseArgs(), 'args' );
	}

	run(){
		this.setup();
		this.parseArgs();
		dispatch();
	}

}