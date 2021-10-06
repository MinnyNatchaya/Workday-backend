module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {},
    {
      underscored: true
    }
  );

  Order.associate = models => {
    Order.hasMany(models.OrderItem, {
      foreignkey: {
        name: 'orderItemId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    }),
      Order.belongsTo(models.User, {
        foreignkey: {
          name: 'userId',
          as: 'clientId',
          allowNull: false
        },
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    Order.belongsTo(models.User, {
      foreignkey: {
        name: 'userId',
        as: 'workerId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };

  return Order;
};
