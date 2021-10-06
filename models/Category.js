module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      name: {
        type: DataTypes.ENUM('การไฟฟ้า', 'การประปา', 'แม่บ้าน', 'กำจัดแมลง'),
        allowNull: false,
        defaultValue: 'การไฟฟ้า'
      },
      logoUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'https://res.cloudinary.com/dl7u9oybl/image/upload/v1633073970/l6y8yhzctblrttmt2xpp.png'
      }
    },
    {
      underscored: true
    }
  );

  Category.associate = models => {
    Category.hasMany(models.SubCategory, {
      foreignkey: {
        name: 'categoryId',
        allowNull: false
      }
    });
  };

  return Category;
};
