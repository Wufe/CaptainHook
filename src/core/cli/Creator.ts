/// <reference path="../../../typings/index.d.ts" />

import * as ArgParse from 'argparse';
import {ArgumentParser, SubParser, SubparserOptions} from 'argparse';

import {Environment} from '../chook';

const commands = require( './commands.json' );

export default class Creator{

	constructor(){}

	createArgumentParser(): ArgumentParser{
		let argumentParser: ArgumentParser = new ArgumentParser({
			version: Environment.package.version,
			description: Environment.package.description,
			addHelp: true
		});
		let rootProperties: any = commands;
		this.addSubparser( argumentParser, rootProperties );
		return argumentParser;
	}

	addSubparser( rootParser: ArgumentParser, properties: any ): void{
		let {title, dest, required, commands}: {
			title?: string;
			dest?: string;
			required?: boolean;
			commands?: any[];
		} = properties;
		let subparser: SubParser = rootParser.addSubparsers({
			title,
			dest
		});
		commands.forEach( ( command: any ) => {
			let {id, args, sub}: {
				id?: any;
				args?: any[];
				sub?: any;
			} = command;
			if( command.args )
				delete command.args;
			if( command.sub )
				delete command.sub;
			if( command.id )
				delete command.id;
			let parser: ArgumentParser = subparser.addParser( id, command );
			if( args ){
				args.forEach( ( arg: any ) => {
					let {id}: {
						id?: any;
					} = arg;
					if( arg.id )
						delete arg.id;
					parser.addArgument( id, arg );
				});
			}
			if( sub )
				this.addSubparser( parser, sub );
		});
	}

}