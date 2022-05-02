const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  addOrderItem,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getAllUsersOrders,
  deliveryOrder,
} = require("../controllers/orderController");

// admin getting all the orders
router.route("/allUserOrder").get(protect, getAllUsersOrders);
// delivery order by admin
router.route("/deliverOrder").post(protect, deliveryOrder);
// Create new Order
router.route("/").post(protect, addOrderItem);

// get my orders
router.route("/myorders").get(protect, getMyOrders);

// get Order by Id
router.route("/:id").get(protect, getOrderById);

//update Order
router.route("/:id/pay").put(protect, updateOrderToPaid);
module.exports = router;
