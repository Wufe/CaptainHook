var models = require( './models.js' );

module.exports = {
  up: ( queryInterface, Sequelize ) => {
    queryInterface.createTable( 'tasks', models.task( Sequelize ));
  },
  down: ( queryInterface, Sequelize ) => {
    queryInterface.dropTable( 'tasks' );
  }
};