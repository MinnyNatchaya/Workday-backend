const { Category } = require('../models');

exports.getAllCategory = async (req, res, next) => {
  try {
    const category = await Category.findAll();
    res.json({ category });
  } catch (err) {
    next(err);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findAll({ where: { id } });
    res.json({ category });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, caption, logoUrl } = req.body;
    const category = await Category.create({
      name,
      caption,
      logoUrl
    });
    res.status(201).json({ category });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, caption, logoUrl } = req.body;
    const [rows] = await Category.update({ name, caption, logoUrl }, { where: { id } });
    //[1]
    if (rows === 0) {
      return res.status(400).json({ message: 'Fail to update category' });
    }
    res.status(200).json({ message: 'Success update category' });
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Category.destroy({ where: { id } });
    //1
    if (rows === 0) {
      return res.status(400).json({ message: 'Fail to delete category' });
    }
    res.status(200).json({ message: 'Success delete category' });
  } catch (err) {
    next(err);
  }
};
