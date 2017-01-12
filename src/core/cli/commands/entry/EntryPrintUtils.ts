import {Task} from '../../../actors';
import {LogSuccess, Log, Utils} from '../../../chook';

export const printFormattedEntries = ( entries: any[] ) => {
	let formattedEntries = Utils.formatTableFromArray( entries.map( entry => entry.get() ) );
	LogSuccess( "Entries\n" + formattedEntries );
};

export const printFormattedEntry = ( entry: any ) => {
	let params: any = entry.get();
	let formattedParams = Utils.formatTableFromArray([
		params
	]);
	LogSuccess( "Entry\n" + formattedParams );
	
	let options: any = entry.get( 'options' );
	options.secret = '*******';
	let formattedOptions = Utils.formatTableFromArray([
		options
	]);
	LogSuccess( "Options\n" + formattedOptions );

	let tasks: any[] = [];
	if( entry.getTasks ){
		tasks = entry.getTasks();
	}else if( entry.tasks ){
		tasks = entry.tasks;
	}else if( entry.data.tasks ){
		tasks = entry.data.tasks;
	}
	if( tasks && tasks.length ){
		let formattedTasks = Utils.formatTableFromArray( tasks.map( ( task: Task ) => task.get()));
		LogSuccess( "Tasks\n" + formattedTasks );
	}
}