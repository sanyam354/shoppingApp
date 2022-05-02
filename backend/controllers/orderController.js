const asyncHandler = require("express-async-handler");
const Order = require("../models/OrderModel");

const addOrderItem = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  if (orderItems && orderItems.length === 0) {
    res.status(400).send({ error: "No Order Found" });
    return;
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      shippingPrice,
      paymentMethod,
      itemsPrice,
      taxPrice,
      totalPrice,
    });
    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

// get orderById
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404).send({ error: "No Order Found" });
  }
});
// paid
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updateOrder = await order.save();
    res.json(updateOrder);
  } else {
    res.status(404).send({ error: "No Order Found" });
  }
});
// get all ordered orders
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// get all orders by an admin
const getAllUsersOrders = asyncHandler(async (req, res) => {
  // fetching all orders
  try {
    const orders = await Order.find({});
    res.status(200).send(orders);
  } catch (error) {
    res.status(404).send({ error: "Error While getting Orders" });
  }
});
// updating the delivery of the order by an admin
const deliveryOrder = asyncHandler(async (req, res) => {
  const orderid = req.body.orderId;
  try {
    const order = await Order.findOne({ _id: orderid });
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    await order.save();
    res.status(200).send("Order delivered Successfully");
  } catch (error) {
    res.status(404).send({ error: "Error while Order Delivery" });
  }
});

module.exports = {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllUsersOrders,
  deliveryOrder,
};
