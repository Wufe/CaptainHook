declare let require: any;
let fs = require( 'fs' );

let fileExists = ( fileName: string ) => {
	try{
        fs.accessSync( fileName, fs.F_OK );
        return true;
    }catch( e ){
        return false;
    }
};

let isFile = ( fileName: string ) => {
    if( fileExists( fileName ) ){
        return fs.lstatSync( fileName ).isFile();
    }
    return false;
}

let isDirectory = ( fileName: string ) => {
	if( fileExists( fileName ) ){
		return !isFile( fileName );
	}
	return false;
}

export {
	fileExists,
	isFile,
	isDirectory
};