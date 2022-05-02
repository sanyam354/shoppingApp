const asyncHandler = require("express-async-handler");
const Product = require("../models/ProductModel");
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

const getProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found!" });
  }
});

// posting review
const postReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);
  product.review.push({
    rating,
    comment,
    name: req.user.name,
    email: req.user.email,
  });

  await product.save();
  res.json(product.review);
});

// deleting the Review Posted
const deleteReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  const index = product.review.findIndex(
    (item) => item.email === req.user.email
  );
  product.review.splice(index, 1);
  await product.save();
  res.json(product.review);
});

// add a new Product by an Admin
const addNewProduct = asyncHandler(async (req, res) => {
  const { product } = req.body;
  try {
    const newAddedProduct = new Product({
      user: req.user._id,
      url: product.url,
      detailUrl: product.detailUrl,
      title: {
        shortTitle: product.title.shortTitle,
        longTitle: product.title.longTitle,
      },
      price: {
        mrp: product.price.mrp,
        cost: product.price.cost,
        discount: product.price.discount,
      },
      description: product.description,
      discount: product.discount,
      tagline: product.tagline,
      countInStock: product.countInStock,
    });
    await newAddedProduct.save();
    res.status(201).json(newAddedProduct);
  } catch (error) {
    res.status(401).send({ error: "Error While Adding New Product" });
  }
});

// get Product By admin and then Edit  request
const getProductById = asyncHandler(async (req, res) => {
  const getProductId = req.body.productId;

  try {
    const product = await Product.findOne({ _id: getProductId });
    res.json(product);
  } catch (error) {
    res.status(401).send({ error: "Error While Getting Product By Id" });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const updatedNewProduct = req.body.updatedProduct;

  try {
    const product = await Product.findOne({ _id: updatedNewProduct });
    product.title = updatedNewProduct.title;
    product.price = updatedNewProduct.price;
    product.url = updatedNewProduct.url;
    product.detailUrl = updatedNewProduct.detailUrl;
    product.description = updatedNewProduct.description;
    product.discount = updatedNewProduct.discount;
    product.countInStock = updatedNewProduct.countInStock;

    product.tagline = updatedNewProduct.tagline;
    await product.save();
    res.status(200).send("product Updated Successfully");
  } catch (error) {
    res.status(401).send({ error: "Error While Updating Product" });
  }
});

// deleting the product by admin
const deleteProduct = asyncHandler(async (req, res) => {
  const productNewId = req.body.productId;
  try {
    await Product.findOneAndDelete({ _id: productNewId });
    res.status(200).send("Product Deleted");
  } catch (error) {
    res.status(401).send({ error: "Error while delete Product" });
  }
});

module.exports = {
  getProduct,
  getProducts,
  postReview,
  deleteReview,
  addNewProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
