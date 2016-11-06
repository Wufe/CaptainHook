/// <reference path="../../../typings/index.d.ts" />

import * as ArgParse from 'argparse';
import {ArgumentParser} from 'argparse';

import {Environment} from '../chook';

export default class Creator{

	constructor(){}

	createArgumentParser(): ArgumentParser{
		let argumentParser: ArgumentParser = new ArgumentParser({
			version: Environment.package.version,
			description: Environment.package.description,
			addHelp: true
		});
		return argumentParser;
	}

}