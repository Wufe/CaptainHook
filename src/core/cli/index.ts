import * as Yargs from 'yargs';
import * as Components from './CommandComponents';
const cmds = require("./commands.json");

export default class Cli{
    args: any[];
    opts: any;
    command: string;
    availableCommands: Components.Command[];

	constructor(){
        let argv:any = Yargs.argv;
		this.parse(argv);
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