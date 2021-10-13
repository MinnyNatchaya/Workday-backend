module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      rate: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      review: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      birthDate: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true
        }
      },
      gender: {
        type: DataTypes.ENUM('Male', 'Female'),
        allowNull: false,
        defaultValue: 'Male'
      },
      address: {
        type: DataTypes.STRING,
        allowNull: true
      },
      telephone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'https://res.cloudinary.com/dl7u9oybl/image/upload/v1633073970/l6y8yhzctblrttmt2xpp.png'
      },
      role: {
        type: DataTypes.ENUM('Client', 'Worker'),
        allowNull: false,
        defaultValue: 'Client'
      }
    },
    {
      underscored: true
    }
  );

  User.associate = models => {
    User.hasMany(models.OrderItem, {
      as: 'client',
      foreignKey: {
        name: 'clientId',
        allowNull: false
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
    User.hasMany(models.OrderItem, {
      as: 'worker',
      foreignKey: {
        name: 'workerId',
        allowNull: true
      },
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT'
    });
  };

  return User;
};
