module.exports = function(Sequelize, DataTypes){
  var columns = {
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    mobile: {
      type: DataTypes.CHAR(10),
      unique: true,
      allowNull: false
    },
    password:{
      type: DataTypes.CHAR(10),
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      field: 'first_name',
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'last_name'
    },
    address: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.ENUM('ADMIN', 'STUDENT', 'TEACHER'),
      allowNull: false
    }
};

return Sequelize.define('User', columns);

}