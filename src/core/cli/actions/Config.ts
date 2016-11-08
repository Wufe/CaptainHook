import Action from './Action';

class Config extends Action{

	constructor(){
		super();
		this.action = "config";
	}

}

const config: Config = new Config();
export default config;