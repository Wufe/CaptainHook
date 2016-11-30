const task = ( Sequelize: any ) => {
	return {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		command: {
			type: Sequelize.STRING,
			unique: false,
			allowNull: true
		},
		working_dir: {
			type: Sequelize.STRING,
			unique: false,
			allowNull: true
		},
		description: {
			type: Sequelize.STRING,
			unique: false,
			allowNull: true
		},
		entry_id: {
			type: Sequelize.INTEGER,
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

export default task;