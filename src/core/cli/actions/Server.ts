import Action from './Action';

export default class Server extends Action{

	constructor(){
		super();
		this.actions = [ "start", "stop", "status" ];
	}

}