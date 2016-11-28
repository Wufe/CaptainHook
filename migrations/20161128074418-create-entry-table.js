var models = require( './models.js' );

module.exports = {
  up: ( queryInterface, Sequelize ) => {
    queryInterface.createTable( 'entries', models.entry( Sequelize ));
  },
  down: ( queryInterface, Sequelize ) => {
    queryInterface.dropTable( 'entries' );
  }
};