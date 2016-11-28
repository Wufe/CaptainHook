const entry = ( Sequelize: any ) => {
	return {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		description: {
			type: Sequelize.STRING,
			unique: false,
			allowNull: true
		},
		uri: {
			type: Sequelize.STRING,
			unique: true,
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

export default entry;