var models = require( './models.js' );

module.exports = {
  up: ( queryInterface, Sequelize ) => {
    queryInterface.createTable( 'hooks', models.hook( Sequelize ));
  },
  down: ( queryInterface, Sequelize ) => {
    queryInterface.dropTable( 'hooks' );
  }
};