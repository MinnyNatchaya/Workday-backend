const { User } = require('../models');
const cloundinary = require('cloudinary').v2;
const util = require('util'); // แปลง function call back เป้น promise
const fs = require('fs'); // จัดการระบบไฟล์ต่างๆของ node.js
const uploadPromise = util.promisify(cloundinary.uploader.upload); // แปลงให้เป็น Promise new Promise reslove, reject
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.getProfileById = async (req, res, next) => {
  try {
    const user = await User.findAll({ where: { id: req.user.id } });
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, username, password, birthDate, gender, address, telephone, imgUrl } = req.body;
    const hasedPassword = await bcrypt.hash(password, 10);

    let result = undefined;

    if (req.file) {
      result = await uploadPromise(req.file.path);
      fs.unlinkSync(req.file.path);
    }

    const [rows] = await User.update(
      {
        firstName,
        lastName,
        username,
        password: hasedPassword,
        birthDate,
        gender,
        address,
        telephone,
        imgUrl: result === undefined ? undefined : result.secure_url
      },
      { where: { id, id: req.user.id } }
    );

    if (rows === 0) {
      return res.status(400).json({ message: 'Fail to update profile' });
    }
    res.status(200).json({ message: 'Success update profile' });
  } catch (err) {
    next(err);
  }
};
