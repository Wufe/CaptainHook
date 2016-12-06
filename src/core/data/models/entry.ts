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
		method: {
			type: Sequelize.ENUM( 'get', 'post', 'put', 'patch', 'delete' ),
			unique: false,
			allowNull: false,
			defaultValue: 'post',
			set: function( value: string ){
				value = value.toLowerCase();
				if( [ 'get', 'post', 'put', 'patch', 'delete' ].indexOf( value ) < 0 ){
					throw new Error( `Method ${value} not valid.` );
				}
				this.setDataValue( 'method', value );
			}
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