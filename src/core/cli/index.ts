import * as Yargs from 'yargs';

export default class Cli{
    args: any[];
    opts: any;
    command: string;

	constructor(){
        let argv:any = Yargs.argv;
		this.parse(argv);
  	}

    parse = (argv: any): void => {
        var _args = argv._;
        this.command = _args[0];
        this.args = _args.splice(1);
        this.opts = {};

        for(var key in argv){
            if(key != "_" && key != "$0"){
                this.opts[key] = argv[key]
            }
        }
    }

}