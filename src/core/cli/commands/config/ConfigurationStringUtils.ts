export const getPathFromKey = ( key: string ) => {
	if( key.indexOf( '.' ) > -1 )
		return key.split( '.' );
	return [ key ];
};