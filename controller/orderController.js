const { OrderItem } = require('../models');

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderItem.findAll({ where: { userId: req.user.id } });
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await OrderItem.findAll({ where: { id, userId: req.user.id } });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const user = req.user;
    const { subCategoryId } = req.params;
    const { status, date, detail, slipUrl, cityId, orderId, workerId } = req.body;

    const order = await OrderItem.create({
      status,
      date,
      detail,
      slipUrl,
      cityId,
      orderId,
      workerId,
      subCategoryId
    });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  // try {
  //   const { id } = req.params;
  //   const { firstName, lastName, username, password, birthDate, gender, address, telephone, imgUrl } = req.body;
  //   const [rows] = await SubCategory.update(
  //     { firstName, lastName, username, password, birthDate, gender, address, telephone, imgUrl },
  //     { where: { id } }
  //   );
  //   if (rows === 0) {
  //     return res.status(400).json({ message: 'Fail to update profile' });
  //   }
  //   res.status(200).json({ message: 'Success update profile' });
  // } catch (err) {
  //   next(err);
  // }
};

exports.deleteOrder = async (req, res, next) => {};
