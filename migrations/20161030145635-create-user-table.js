var models = require( './models.js' );

module.exports = {
	up: ( queryInterface, Sequelize ) => {
		queryInterface.createTable( 'users', models.user( Sequelize ));
	},
	down: ( queryInterface, Sequelize ) => {
		queryInterface.dropTable( 'users' );
	}
};