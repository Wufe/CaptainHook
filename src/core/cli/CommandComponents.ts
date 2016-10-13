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

    constructor(cmd: string, description: string, opts: Option[], args: Argument[], callable: boolean, subcommands: Command[]){
        this.cmd = cmd;
        this.opts = opts;
        this.args = args;
        this.callable = callable;
        this.subcommands = subcommands;
    }
    getRequiredArgumentCount(): number{
        var count = 0;

        var arg: Argument;
        for(var i in this.args){
            arg = this.args[i];
            if(arg.required){
                count++;
            }
        }

        return count;
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

}

export { Option, Argument, Command };