const CHook = require( '../../../../build/lib/chook.js' );
const Database = CHook.Database;

describe( 'Database', function(){
	describe( 'models', function(){
		it( 'should contain a model called "user"', function(){
			Database.models.should.have.property( 'user' );
		});
	});
});