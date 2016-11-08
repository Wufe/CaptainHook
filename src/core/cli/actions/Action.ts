export default class Action{

	protected action: string;
	protected actions: string[];

	public matches( action: string ){
		if( this.action ){
			if( action == this.action )
				return true;
		}
		if( this.actions ){
			this.actions.forEach( ( act: string ) => {
				if( act == action )
					return true;
			});
		}
		return false;
	}

}