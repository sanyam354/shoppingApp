const express = require("express");
const {
  getProduct,
  getProducts,
  postReview,
  deleteReview,
  addNewProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

//Fetching all Products from the product Model
router.route("/products").get(getProducts);

// Indivisual product by _id
router.route("/products/:id").get(getProduct);
//
// add a new Product by admin
router.route("/products/addNewProduct").post(protect, addNewProduct);
//
router.route("/products/getProductById").post(protect, getProductById);
//
router.route("/products/updatedProduct").post(protect, updateProduct);
//
router.route("/products/deleteProduct").post(protect, deleteProduct);
// to post the review
router.route("/review/:id").post(protect, postReview);
// to delete the post
router.route("/deletePost/:id").post(protect, deleteReview);

module.exports = router;
