const fs = require( 'fs' );

let fileExists = ( fileName: string ) => {
	try{
        fs.accessSync( fileName, fs.F_OK );
        return true;
    }catch( e ){
        return false;
    }
};

let getNestedValue = ( obj: any, ...keys: string[] ) => {
    if( keys.length === 1 ){
        return obj[ keys[0] ];
    }else{
        let value: any = obj;
        let i: number = 0;
        while( typeof value != 'undefined' && i < keys.length ){
            value = value[ keys[i++] ];
        }
        return value;
    }
};

let isFile = ( fileName: string ) => {
    if( fileExists( fileName ) ){
        return fs.lstatSync( fileName ).isFile();
    }
    return false;
};

let isDirectory = ( fileName: string ) => {
	if( fileExists( fileName ) ){
		return !isFile( fileName );
	}
	return false;
};

let setNestedValue = ( obj: any, value: any, ...keys: string[] ) => {
    let objSubtree: any = obj;
    let finalKey: string;
    while( keys.length > 0 ){
        if( finalKey ){
            objSubtree = objSubtree[ finalKey ];    
        }
        let key: string = keys[0];
        keys = keys.slice(1);
        if( objSubtree[ key ] === undefined || typeof objSubtree[ key ] != "object" ){
            objSubtree[ key ] = {};
        }
        finalKey = key;
    }
    objSubtree[ finalKey ] = value;
    return obj;
};

let printTableFromArray = ( data: any[], padding: number = 2 ): void => {
    if( !data || data.length == 0 )
        return;
    let max: any = {};
    let keys: any = {}
    Object.keys( data[0] ).forEach( ( key: string ) => {
        keys[key] = key;
    });
    data = [ keys, ...data ];
    data.forEach( ( element: any ) => {
        for( let key in element ){
            let length: number = `${element[key]}`.length;
            if( !max[key] || length > max[key] )
                max[key] = length;
        }
    });
    let p: string = " ".repeat( padding );
    data.forEach( ( element: any ) => {
        let values: string[] = [];
        for( let key in element ){
            let length: number = `${element[key]}`.length;
            let additionalSpace: number = max[key] - length;
            values.push( `${element[key]}${" ".repeat( additionalSpace )}` );
        }
        console.log( `${p}${values.join( `${p}|${p}` )}${p}` );
    });
};

let truncateText = ( string: string, offset: number ): string =>{
    if( offset >= string.length )
        return string;
    return string.substr( 0, offset ) + `..`;
};

export {
	fileExists,
    getNestedValue,
	isFile,
	isDirectory,
    printTableFromArray,
    setNestedValue,
    truncateText
};