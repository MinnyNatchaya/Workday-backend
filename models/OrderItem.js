module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(
    'OrderItem',
    {
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      detail: DataTypes.STRING,

      slipUrl: DataTypes.BLOB
    },
    {
      underscored: true
    }
  );

  OrderItem.associate = models => {
    OrderItem.belongsTo(models.Order, {
      foreignKey: {
        name: 'orderItemId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    }),
      OrderItem.belongsTo(models.SubCategory, {
        foreignkey: {
          name: 'subCategoryId',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
  };

  return OrderItem;
};
