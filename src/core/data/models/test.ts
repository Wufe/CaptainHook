const test = ( Sequelize: any ) => {
	return {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		test: {
			type: Sequelize.STRING,
			allowNull: false
		},
		created_at: {
			type: Sequelize.DATE
		},
		updated_at: {
			type: Sequelize.DATE
		}
	};
};

export default test;