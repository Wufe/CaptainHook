import Cli from './cli';
import EntryManager from './chook/EntryManager';
import Server from './server/Server';
import Configuration from './configuration/Configuration';

export {
	Cli,
	Configuration,
	EntryManager,
	Server
};

/* Sample code */
const server: Server = new Server();
server.addRoute( 'get', '/webhook/idaji', (request, response) => {
	response.send( 'OK' );
});
server.listen();