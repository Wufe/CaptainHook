module.exports = {
	up: function( queryInterface, Sequelize ){
		return queryInterface.bulkInsert( 'users', [
			{
				username: 'admin',
				password: '$2a$12$IUbyxgxNyrYPa9s.cvog0u62jqsImnE2QW6eCop3qPY5WV21xJH12'
			}
		]);
	},
	download: function( queryInterface, Sequelize ){
		return queryInterface.bulkDelete( 'users', null, {});
	}
}