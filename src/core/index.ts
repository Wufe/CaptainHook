import Cli from './cli';
import EntryManager from './chook/EntryManager';
import Server from './server/Server';
import Configuration from './configuration/Configuration';
import * as Utils from './chook/Utils';

export {
	Cli,
	Configuration,
	EntryManager,
	Server,
	Utils
};

/* Sample code */
const server: Server = new Server();
server.addRoute( 'get', '/webhook/idaji', (request, response) => {
	response.send( 'OK' );
});
server.listen();