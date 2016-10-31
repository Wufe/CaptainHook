const CHook = require( '../../../build/lib/chook.js' );
const ServerManager = CHook.ServerManager;
const GUIManager = CHook.GUIManager;
const AuthenticationRouter = CHook.Authentication.Router;

describe( 'ServerManager', function(){
	let serverManager = new ServerManager();
	describe( 'createAuthenticationRouter', function(){
		let authenticationRouter = serverManager.createAuthenticationRouter();
		it( 'should create Authentication.Router instance', function(){
			authenticationRouter.should.be.an.instanceOf( AuthenticationRouter );
		});
	})
	describe( 'createGuiManager', function(){
		let guiManager = serverManager.createGuiManager();
		it( 'should create GUIManager instance', function(){
			guiManager.should.be.an.instanceOf( GUIManager );
		});
	})
});