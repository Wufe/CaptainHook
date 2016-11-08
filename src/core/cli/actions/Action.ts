export default class Action{

	protected action: string;
	protected actions: string[];

	public matches( action: string ){
		if( this.action ){
			if( action == this.action )
				return true;
		}
		if( this.actions ){
			let found: boolean = false;
			this.actions.forEach( ( act: string ) => {
				if( act == action )
					found = true;
			});
			return found;
		}
		return false;
	}

	public run(){}

}