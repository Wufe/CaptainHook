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
}

export { Option, Argument, Command };