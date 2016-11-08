import Action from './Action';

class Server extends Action{

	constructor(){
		super();
		this.actions = [ "start", "stop", "status" ];
	}

	run(): void{
		super.run();
		console.log( 'Calling server component' );
	}

}

const server: Server = new Server();
export default server;