var models = require( './models.js' );

module.exports = {
  up: ( queryInterface, Sequelize ) => {
    queryInterface.createTable( 'tests', models.test( Sequelize ));
  },
  down: ( queryInterface, Sequelize ) => {
    queryInterface.dropTable( 'tests' );
  }
};