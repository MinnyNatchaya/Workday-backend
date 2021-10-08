const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

// ตรวจสอบ token
exports.authenticate = async (req, res, next) => {
  try {
    //get request header
    // console.log(headers);

    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith('Bearer')) {
      return res.status(401).json({ message: 'you are unauthorized' });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'you are unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // decosded เป็น obj {id, email: , username}

    const user = await User.findOne({ where: { id: decoded.id } }); //หา user
    if (!user) {
      return res.status(401).json({ message: 'you are unauthorized' });
    }

    // กรณีเจอ เพิ่มค่าใน obj ที่เป็น Global object ที่ตัวอื่นแรกใช้ได้เรียกใน middleware ตัวอื่นในหน้า Route
    req.user = user;
    req.data = decoded;
    next();
  } catch (err) {
    console.log(err.name);
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, username, password, birthDate, gender, telephone } = req.body;
    const hasedPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      username,
      password: hasedPassword,
      birthDate,
      gender,
      telephone,
      role: 'Client'
    });
    res.status(200).json({ message: 'Your account has been created' });
  } catch (err) {
    next(err);
  }
};

exports.signupWorker = async (req, res, next) => {
  try {
    const { firstName, lastName, username, password, birthDate, gender, telephone } = req.body;
    const hasedPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      username,
      password: hasedPassword,
      birthDate,
      gender,
      telephone,
      role: 'Worker'
    });
    res.status(200).json({ message: 'Your account has been created' });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });
    if (!user) {
      return res.status(400).json({ messageUsername: '**Invalid username' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ messagePassword: '**Invalid password' });
    }

    // token
    const payload = {
      id: user.id,
      username: user.username,
      role: user.role
    };

    const secretKey = process.env.JWT_SECRET_KEY;

    const token = jwt.sign(payload, secretKey, { expiresIn: 60 * 60 * 24 });

    res.json({ message: 'login success', token });
  } catch (err) {
    next(err);
  }
};
