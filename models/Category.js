module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      caption: {
        type: DataTypes.STRING,
        allowNull: false
      },
      logoUrl: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      underscored: true
    }
  );

  Category.associate = models => {
    Category.hasMany(models.SubCategory, {
      foreignKey: {
        name: 'categoryId',
        allowNull: false
      }
    });
  };

  return Category;
};
