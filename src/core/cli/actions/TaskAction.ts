import Action from './Action';

import {Task} from '../../actors';
import {EntryRepository, EntryModel, Environment, Log, Utils} from '../../chook';

import {createInterface, ReadLine} from 'readline';

import {green, red} from 'chalk';

interface TaskArgs{
	action: string;
	taskAction: string;
	entry_id?: string | number;
	task_id?: number;
	after?: number;
}

class TaskAction extends Action{

	args: TaskArgs;

	constructor(){
		super();
		this.actions = [ "task", "t" ];
	}

	run(){
		super.run();
		this.args = Environment.get( 'args' );
		if( [ "add", "a", "create", "c" ].indexOf( this.args[ 'taskAction' ] ) > -1 ){
			this.addTask();
		}else if( [ "delete", "del", "d" ].indexOf( this.args[ 'taskAction' ] ) > -1 ){
			this.deleteTask();
		}
	}

	addTask(): void{
		let entryRepository: EntryRepository = new EntryRepository();
		let {entry_id} = this.args;
		entryRepository
			.loadEntries()
			.then( () => {
				let foundEntryModel: EntryModel = entryRepository.findById( <number>entry_id );
				if( !foundEntryModel )
					foundEntryModel = entryRepository.findByName( `${entry_id}` );
				if( !foundEntryModel )
					throw new Error( `Cannot find entry with id ${entry_id}.` );
				this.addTaskToEntryModel( foundEntryModel );
			})
			.catch( ( error: any ) => {
				Log( "error", red( error.message ) );
			})
	}

	addTaskToEntryModel( entryModel: EntryModel ): void{
		let readline: ReadLine = this.getReadlineInterface();
		readline.question( `$ `, ( command: string ) => {
			readline.question( `Working directory (leave blank for inherit): `, ( working_dir: string ) => {
				readline.question( `Description: `, ( description: string ) => {
					readline.question( `Place it after task id (leave blank for default): `, ( afterString: string ) => {
						let task: Task;
						try{
							if( !command )
								throw new Error( `Not a valid command.` );
							task = new Task({
								command,
								working_dir,
								description,
								entry_id: entryModel.getId()
							});
							if( afterString ){
								let after = parseInt(afterString);
								let reference = entryModel.getTasks().findIndex( ( task: Task ) => {
									return task.get( 'id' ) == after;
								});
								if( reference == -1 ){
									throw new Error( `There is no task with ID ${after}.` );
								}
							}
							let savePromise = task.save();
							if( afterString ){
								savePromise
									.then( ( task: Task ) => {
										return entryModel.updateSchema( task, parseInt( afterString ) );
									});
							}
							savePromise.then( () => {
								console.log( green( `Command saved.` ) );
							})
							.catch( ( error: any ) => {
								Log( "error", red( error.message ) );
							});
						}catch( error ){
							Log( "error", red( error.message ) );
						}
						readline.close();
					});
				});
			});
		});
	}

	getReadlineInterface() : ReadLine{
		let readline: ReadLine = createInterface({
			input: process.stdin,
			output: process.stdout
		});
		return readline;
	}

	deleteTask(): void{
		let entryRepository: EntryRepository = new EntryRepository();
		let {task_id} = this.args;
		Task
			.find
			.byId( task_id )
			.then( ( task: Task ) => {
				task.delete();
				console.log( green( `Command deleted.` ) );
			})
			.catch( ( error: any ) => {
				Log( "error", red( error.message ), error );
			});
	}
}

const taskAction: TaskAction = new TaskAction();
export default taskAction;