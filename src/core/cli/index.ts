import * as Yargs from 'yargs';

export default class Cli{
	constructor(){
        let argv:any = Yargs.argv
		console.log( argv );
	}	
}