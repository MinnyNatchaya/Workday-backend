const { OrderItem } = require('../models');

exports.getAllOrders = async (req, res, next) => {
  try{
      const orders = await OrderItem.findAll({where:{clientId : req.user.id}})
      res.json({ orders });
  }catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
// const {id} = req.params
// const order
};


exports.createOrder = async (req, res, next) => {

};


exports.updateOrder = async (req, res, next) => {

};



exports.deleteOrder = async (req, res, next) => {

};
