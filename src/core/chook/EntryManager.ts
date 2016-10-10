class EntryManager{

	entries: string[];

	constructor(){
		this.entries.push( `/webhook/1234` );
		this.entries.push( `/webhook/5678` );
		this.entries.push( `/webhook/9ABC` );
		this.entries.push( `/webhook/DEF0` );
	}
	
	getEntries(): string[] {
		return this.entries;
	}
}

export default EntryManager;