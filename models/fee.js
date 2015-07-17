module.exports = function(sequelize, DataTypes){
	var columns = {
		userId: {
			type: DataTypes.INTEGER,
			field: 'user_id'
		},
		amount: {
			type: DataTypes.INTEGER,
			field: 'amount'
		},
		month: {
			type: DataTypes.ENUM(
									'JANUARY', 'FEBRUARY', 'MARCH',
									'APRIL', 'MAY', 'JUNE', 'JULY',
									'AUGUST', 'SEPTEMBER', 'OCTOBER',
									'NOVEMBER', 'DECEMBER'
								),
      		allowNull: false
		}
	}
	return sequelize.define('Fee', columns);
}