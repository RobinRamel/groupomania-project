
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    image:  DataTypes.STRING,
    author: DataTypes.TEXT
  })

  Post.associate = function(models) {
    Post.hasMany(models.Comment, {
      foreignKey: {
        allowNull: false
      }
    })

    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }

  return Post
}
  



