import Action from './Action';

import Configuration from '../../Configuration';
import {Environment} from '../../chook';

class Config extends Action{

	args: {
		action: string;
		configAction: string;
		key: string;
		value?: string;
	};

	constructor(){
		super();
		this.action = "config";
	}

	run(): void{
		super.run();
		this.args = Environment.get( 'args' );
		if( this.args[ 'configAction' ] == 'get' ){
			this.getConfigurationValue();
		}else if( this.args[ 'configAction' ] == 'set' ){
			this.setConfigurationValue();
		}
	}

	getPathFromKey( key: string ): string[]{
		if( key.indexOf( '.' ) > -1 )
			return key.split( '.' );
		return [ key ];
	}

	getConfigurationValue(): void{
		let key: string = this.args.key;
		if( key == '*' ){
			console.log( Configuration.get() );
			return;
		}
		let keys: string[] = this.getPathFromKey( key );
		console.log( Configuration.get( ...keys ) );
	}

	setConfigurationValue(): void{
		let keys: string[] = this.getPathFromKey( this.args.key );
		Configuration.set( this.args.value, ...keys );
	}

}

const config: Config = new Config();
export default config;