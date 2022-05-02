const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rating: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    url: {
      type: String,
      required: true,
    },
    detailUrl: {
      type: String,
      required: true,
    },
    title: {
      shortTitle: {
        type: String,
        required: true,
      },
      longTitle: {
        type: String,
        required: true,
      },
    },
    price: {
      mrp: {
        type: Number,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
      },
      discount: {
        type: String,
        required: true,
      },
    },
    description: {
      type: String,
    },
    discount: {
      type: String,
      required: true,
    },
    tagline: {
      type: String,
    },
    review: [reviewSchema],
    rating: {
      type: Number,
    },
    numReviews: {
      type: Number,
    },
    countInStock: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
