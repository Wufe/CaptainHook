const ServerManager = require( '../../../build/lib/chook.js' ).ServerManager;
const Path = require( 'path' );

const serverManager = new ServerManager();
const guiManagerInstance = serverManager.createGuiManager();

describe( 'GUIManager', function(){
	describe( 'setup', function(){
		it( 'should be a function', function(){
			guiManagerInstance.setup.should.be.a.Function;
		});
	});
});