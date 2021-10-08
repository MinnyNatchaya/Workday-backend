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
      foreignKey: {
        name: 'orderId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    Order.belongsTo(models.User, {
      as: 'client',
      foreignKey: {
        name: 'clientId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };

  return Order;
};
