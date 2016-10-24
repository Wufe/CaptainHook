class Option{
    name: string;
    fullname: string;
    description: string;

    constructor(name: string, fullname: string, description: string){
        this.name = name;
        this.fullname = fullname;
        this.description = description;
    }
}

class Argument{
    name: string;
    description: string;
    required: boolean;

    constructor(name: string, description: string, required: boolean){
        this.name = name;
        this.description = description;
        this.required = required;
    }
}

class Command{
    cmd: string;
    description: string;
    opts: Option[];
    args: Argument[];
    callable: boolean;
    subcommands: Command[];

    errState: any;

    constructor(cmd: string, description: string, opts: Option[], args: Argument[], callable: boolean, subcommands: Command[]){
        this.cmd = cmd;
        this.opts = opts;
        this.args = args;
        this.callable = callable;
        this.subcommands = subcommands;

        this.errState = {};
    }

    }

    canCall(cmd: string, args: any[], opts: any[]){
        var match: boolean = true;
        match = match && (cmd == this.cmd);
        match = match && this.matchArgs(args);
        match = match && this.matchOpts(opts);

        return match;
    }

    getRequiredArgumentCount(): number{
         return this.getRequiredArguments().length;   
    }

    getRequiredArguments(): Argument[]{
        var args: Argument[] = [];

        var arg: Argument;
        for(var i in this.args){
            arg = this.args[i];
            if(arg.required){
                args.push(arg);
            }
        }

        return args;
    }

    matchArgs(given: any[]): boolean{
        var result: boolean = true;
        if(given.length < this.getRequiredArgumentCount() && given.length > this.args.length){
            result = false;
            var error: any = {};

            if(given.length < this.getRequiredArgumentCount()){
                var required_args = this.getRequiredArguments();
                var strings: string[] = [];

                var r_arg: Argument;
                for (var i in required_args){
                    r_arg = required_args[i];

                    if (r_arg.required){
                        strings.push(r_arg.name);
                    }

                }

                error = {
                    "type": "NotEnough",
                    "given_out": [],
                    "required": strings,
                }

                
            }

            if (given.length > this.args.length){
                var left_args = given.slice(this.args.length)

                error = {
                    "type": "TooMany",
                    "given_out": left_args,
                    "required": [],
                }
            }

            this.errState["args"] = error;
        }

        return result
    }

    isValidOption(given: any): boolean{
        var opt: Option;
        for(var i in this.opts){
            opt = this.opts[i];
            if((given == opt.name) || (given == opt.fullname)){
                return true;
            }
        }
        return false;
    }

    matchOpts(given: any[]): boolean{
        var match: boolean = true;
        for(var key in given){
            match = match && this.isValidOption(key);
        }
        return match;
    }
}

export { Option, Argument, Command };