const { OrderItem } = require('../models');
const { SubCategory } = require('../models');
const { Category } = require('../models');
const { User } = require('../models');

exports.getAllOrderItem = async (req, res, next) => {
  try {
    const orders = await OrderItem.findAll({
      where: { workerId: req.user.id },
      include: [
        {
          model: SubCategory,
          attributes: ['name'],

          include: {
            model: Category,
            attributes: ['name', 'logoUrl']
          }
        },
        {
          where: { role: 'Client' },
          model: User,
          as: 'client',
          attributes: ['username', 'telephone', 'rate', 'review']
        }
      ],
      order: [['id', 'DESC']]
    });

    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrderItemBySubCategoryId = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;
    // console.dir(req.params);
    const orders = await OrderItem.findAll({
      where: { subCategoryId },
      include: [
        {
          model: SubCategory,
          attributes: ['name'],

          include: {
            model: Category,
            attributes: ['name', 'logoUrl']
          }
        },
        {
          where: { role: 'Client' },
          model: User,
          as: 'client',
          attributes: ['username', 'rate', 'review']
        }
      ],
      order: [['id', 'DESC']]
    });
    // console.log(JSON.stringify(orders, null, 2));
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderItem = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    // console.log(id);
    const [rows] = await OrderItem.update(
      {
        workerId: user.id
      },
      { where: { id } }
    );
    if (rows === 0) {
      return res.status(400).json({ message: 'Fail to update order' });
    }
    res.status(200).json({ message: 'Success update order' });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderItemReview = async (req, res, next) => {
  try {
    const user = req.user;
    const { id } = req.params;
    // console.log(id);
    const [rows] = await OrderItem.update(
      {
        isWorkerReview: true
      },
      { where: { id } }
    );
    if (rows === 0) {
      return res.status(400).json({ message: 'Fail to update order' });
    }
    res.status(200).json({ message: 'Success update order' });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderItemCancle = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const [rows] = await OrderItem.update(
      {
        workerId: null
      },
      { where: { id, workerId: req.user.id } }
    );
    if (rows === 0) {
      return res.status(400).json({ message: 'Fail to update order' });
    }
    res.status(200).json({ message: 'Success update order' });
  } catch (err) {
    next(err);
  }
};

exports.updateCancleSlip = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await OrderItem.update(
      {
        slipUrl: null
      },
      { where: { id, workerId: req.user.id } }
    );
    if (rows === 0) {
      return res.status(400).json({ message: 'Fail to update order' });
    }
    res.status(200).json({ message: 'Success update order' });
  } catch (err) {
    next(err);
  }
};

exports.updateFinishWork = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await OrderItem.update(
      {
        status: true
      },
      { where: { id, workerId: req.user.id } }
    );
    if (rows === 0) {
      return res.status(400).json({ message: 'Fail to update order' });
    }
    res.status(200).json({ message: 'Success update order' });
  } catch (err) {
    next(err);
  }
};
