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

    parseCommand = (obj: any, name: string): Components.Command => {
        var description: string = obj.description;
        var opts = this.parseOpts(obj.opts);
        var args = this.parseArguments(obj.args);
        var callable: boolean = obj.callable;

        var subcommands: Components.Command[] = [];
        var sc: any
        for(sc in obj.subcommands){
            var tSub = this.parseCommand(obj.subcommands[sc], sc);
            subcommands.push(tSub);
        }

        return new Components.Command(name, description, opts, args, callable, subcommands);
    }

    parseArguments = (arr: any): Components.Argument[] => {
        var args: Components.Argument[] = [];
        var argObj: any;
        for(var i in arr){
            argObj = arr[i];
            let name = argObj.name;
            let description = argObj.description;
            let required = argObj.required;

            let tArg = new Components.Argument(name, description, required)
            args.push(tArg);
        }

        return args;
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