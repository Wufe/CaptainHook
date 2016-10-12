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

    parseOpts = (arr: any): Components.Option[] => {
        var opts: Components.Option[] = [];

        var optObj: any;
        for(var i in arr){
            optObj = arr[i];
            let name = optObj.name;
            let fullname = optObj.fullname;
            let description = optObj.description;

            let tOpt = new Components.Option(name, fullname, description);
            opts.push(tOpt);
        }

        return opts;
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