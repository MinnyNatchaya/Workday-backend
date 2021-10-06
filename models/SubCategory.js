module.exports = (sequelize, DataTypes) => {
  const SubCategory = sequelize.define(
    'SubCategory',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      underscored: true
    }
  );

  SubCategory.associate = models => {
    SubCategory.hasMany(models.OrderItem, {
      foreignkey: {
        name: 'subCategoryId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    }),
      SubCategory.belongsTo(models.Category, {
        foreignkey: {
          name: 'categoryId',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
  };

  return SubCategory;
};
