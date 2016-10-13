import * as Yargs from 'yargs';
import * as Components from './CommandComponents';
import ArgumentParser from './ArgumentParser';
const cmds = require("./commands.json");

//only for development purposes, tp be removed
const util = require('util')

export default class Cli{
    args: any[];
    opts: any;
    command: string;
    availableCommands: Components.Command[];

    parser: ArgumentParser;

	constructor(){
        this.parser = new ArgumentParser();
        this.availableCommands = this.parser.prepareCommands(cmds);

        console.log(util.inspect(this.availableCommands, {showHidden: false, depth: null}));

        let argv:any = Yargs.argv;
        this.parse(argv);
        process.exit();
  	}

    parse = (argv: any): void => {
        var _args = argv._;
        this.command = _args[0];
        this.args = _args.splice(1);
        this.opts = {};

        // Filter out args and filename
        var key: string;
        for(key in argv){
            if(key != "_" && key != "$0"){
                this.opts[key] = argv[key]
            }
        }
    }

}