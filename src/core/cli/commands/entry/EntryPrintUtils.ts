import {Task} from '../../../actors';
import {LogSuccess, Utils} from '../../../chook';

export const printFormattedEntries = ( entries: any[] ) => {
	Utils.printTableFromArray( entries.map( entry => entry.get() ) );
};

export const printFormattedEntry = ( entry: any ) => {
	console.log( 'Entry:' );
	let params: any = entry.get();
	Utils.printTableFromArray([
		params
	]);
	
	let options: any = entry.get( 'options' );
	console.log( '\nOptions:' );
	options.secret = '*******';
	Utils.printTableFromArray([
		options
	]);

	let tasks: any[] = [];
	if( entry.getTasks ){
		tasks = entry.getTasks();
	}else if( entry.tasks ){
		tasks = entry.tasks;
	}else if( entry.data.tasks ){
		tasks = entry.data.tasks;
	}
	if( tasks && tasks.length ){
		console.log( '\nCommands:' );
		Utils.printTableFromArray( tasks.map( ( task: Task ) => task.get()));
	}
}