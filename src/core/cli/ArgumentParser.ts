import * as Components from './CommandComponents';

export default class Parser{
    prepareCommands(cmds: any[]): Components.Command[]{
        var commands: Components.Command[] = [];

        for(var key in cmds){
            var tCmd = this.parseCommand(cmds[key], key);
            commands.push(tCmd);
        }

        return commands;
    }

    parseCommand(obj: any, name: string): Components.Command{
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

    parseArguments(arr: any): Components.Argument[]{
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

    parseOpts(arr: any): Components.Option[]{
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
}