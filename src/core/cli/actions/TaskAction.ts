import Action from './Action';

import {Task} from '../../actors';
import {Environment, Log, Utils} from '../../chook';

interface TaskArgs{
	action: string;
	taskAction: string;
	entry_id?: string | number;
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
		if( [ "add", "a" ].indexOf( this.args[ 'taskAction' ] ) > -1 ){
			
		}
	}

}

const taskAction: TaskAction = new TaskAction();
export default taskAction;