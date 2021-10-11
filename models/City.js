module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    'City',
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

  City.associate = models => {
    City.hasMany(models.OrderItem, {
      foreignKey: {
        name: 'cityId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };

  return City;
};
