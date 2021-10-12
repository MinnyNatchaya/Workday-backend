const { OrderItem } = require('../models');
const { SubCategory } = require('../models');
const { Category } = require('../models');

exports.getAllOrdersItem = async (req, res, next) => {
  try {
    const orders = await OrderItem.findAll({
      where: { clientId: req.user.id },
      include: {
        model: SubCategory,
        attributes: ['name'],
        include: {
          model: Category,
          attributes: ['name', 'logoUrl']
        }
      }
    });
    console.log(JSON.stringify(orders, null, 2));

    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrderItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const orderItem = await OrderItem.findAll({ where: { id, clientId: req.user.id } });
    res.json({ orderItem });
  } catch (err) {
    next(err);
  }
};

exports.createOrderItem = async (req, res, next) => {
  try {
    const user = req.user;
    const { subCategoryId } = req.params;
    const { address, date, detail, city } = req.body;

    console.dir(req.body);
    // console.dir(req.params);
    // console.dir(subCategoryId);
    // console.dir(city);

    // const orders = await Orders.create({
    //   clientId: user.id
    // });

    const orderItem = await OrderItem.create({
      address,
      date,
      detail,
      cityId: city,
      // status: false,
      // slipUrl,
      // workerId,
      subCategoryId,
      clientId: user.id
    });
    res.json({ orderItem });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderItem = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    const { address, date, detail, city } = req.body;
    const [rows] = await OrderItem.update(
      { address, date, detail, cityId: city },
      { where: { id, clientId: req.user.id } }
    );
    if (rows === 0) {
      return res.status(400).json({ message: 'Fail to update order' });
    }
    res.status(200).json({ message: 'Success update order' });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrderItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await OrderItem.destroy({ where: { id, clientId: req.user.id } });
    //1
    if (rows === 0) {
      return res.status(400).json({ message: 'Fail to delete order' });
    }
    res.status(200).json({ message: 'Success delete order' });
  } catch (err) {
    next(err);
  }
};
