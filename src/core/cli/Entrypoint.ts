/// <reference path="../../../typings/index.d.ts" />

import * as ArgParse from 'argparse';
import {ArgumentParser} from 'argparse';

import Creator from './Creator';
import {Environment} from '../chook';

export default class Entrypoint{

	argumentParser: ArgumentParser;
	constructor(){
		this.setup();
	}

	setup(): void{
		let creator: Creator = new Creator();
		this.argumentParser = creator.createArgumentParser();
		Environment.set( this.argumentParser.parseArgs(), 'args' );
		console.log( Environment.get( 'args' ) );
	}

}