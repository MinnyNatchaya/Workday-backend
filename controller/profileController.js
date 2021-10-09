const { User } = require('../models');

exports.getProfileById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findAll({ where: { id } });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, username, password, birthDate, gender, address, telephone, imgUrl } = req.body;
    const [rows] = await SubCategory.update(
      { firstName, lastName, username, password, birthDate, gender, address, telephone, imgUrl },
      { where: { id } }
    );
    if (rows === 0) {
      return res.status(400).json({ message: 'Fail to update profile' });
    }
    res.status(200).json({ message: 'Success update profile' });
  } catch (err) {
    next(err);
  }
};
