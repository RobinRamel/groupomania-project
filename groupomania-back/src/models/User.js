
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    role: DataTypes.STRING
  })

  User.associate = function(models) {
    User.hasMany(models.Post, {
      foreignKey: {
        allowNull: false
      }
    })
    User.hasMany(models.Comment, {
      foreignKey: {
        allowNull: false
      }
    })
  }
 
  return User
}
  