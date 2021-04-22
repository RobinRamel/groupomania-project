
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    author: DataTypes.TEXT
    })

  Comment.associate = function(models) {
    Comment.belongsTo(models.Post, {
      onDelete: 'cascade',
      foreignKey: { allowNull: false },
      hooks: true,
    })

    Comment.belongsTo(models.User, {
      onDelete: 'cascade',
      foreignKey: { allowNull: false },
      hooks: true,
    })
  }
  
  return Comment
}
