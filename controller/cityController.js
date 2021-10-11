const { City } = require('../models');

exports.getAllCities = async (req, res, next) => {
  try {
    const city = await City.findAll();
    res.json({ city });
  } catch (err) {
    next(err);
  }
};

exports.getCityById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const city = await City.findAll({ where: { id } });
    res.json({ city });
  } catch (err) {
    next(err);
  }
};

exports.createCity = async (req, res, next) => {
  try {
    const { name } = req.body;
    const city = await City.create({
      name
    });
    res.status(201).json({ city });
  } catch (err) {
    next(err);
  }
};

exports.updateCity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const [rows] = await City.update({ name }, { where: { id } });
    //[1]
    if (rows === 0) {
      return res.status(400).json({ message: 'Fail to update sub category' });
    }
    res.status(200).json({ message: 'Success update sub category' });
  } catch (err) {
    next(err);
  }
};

exports.deleteCity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await City.destroy({ where: { id } });
    //1
    if (rows === 0) {
      return res.status(400).json({ message: 'Fail to delete sub category' });
    }
    res.status(200).json({ message: 'Success delete sub category' });
  } catch (err) {
    next(err);
  }
};
