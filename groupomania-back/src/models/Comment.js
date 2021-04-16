
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: DataTypes.TEXT,
    author: DataTypes.TEXT
    })

  Comment.associate = function(models) {
    Comment.belongsTo(models.Post, {
      foreignKeyConstraint: true,
      onDelete: 'CASCADE',
    })

    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    })
  }
  
  return Comment
}
