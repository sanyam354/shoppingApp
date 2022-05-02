import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";

import Spinner from "../shared/Spinner";
import Alert from "../shared/Alert";
import { getProductById, updateProduct } from "../../actions/productActions";

const EditProduct = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cost, setCost] = useState(0);
  const [mrp, setMrp] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [tagline, setTagline] = useState("");

  const [countInStock, setCountInStock] = useState(0);

  const newAddedProduct = useSelector((state) => state.addNewProductReducer);

  const { error } = newAddedProduct;

  //
  const { productId } = useParams();

  const getProductByState = useSelector(
    (state) => state.postProductByIdReducer
  );

  const { getProduct } = getProductByState;

  const updatedProduct = useSelector((state) => state.updateProductByIdReducer);

  const { updateLoading, updatederror } = updatedProduct;

  const dispatch = useDispatch();
  useEffect(() => {
    if (getProduct && getProduct._id === productId) {
      setName(getProduct.title.longTitle);
      setCategory(getProduct.title.shortTitle);
      setImage(getProduct.url);
      setCost(getProduct.price.cost);
      setMrp(getProduct.price.mrp);
      setDiscount(getProduct.price.discount);
      setDescription(getProduct.description);
      setTagline(getProduct.tagline);
      setCountInStock(getProduct.countInStock);
    } else {
      dispatch(getProductById(productId));
    }
  }, [dispatch, getProduct]);

  const submitForm = (e) => {
    e.preventDefault();

    const updatedProduct = {
      _id: productId,
      title: { shortTitle: category, longTitle: name },
      price: { mrp: mrp, cost: cost, discount: discount },
      url: image,
      detailUrl: image,
      description: description,
      discount: discount,
      countInStock: countInStock,

      tagline: tagline,
    };
    dispatch(updateProduct(updatedProduct));

    window.location.href = "/admin/productList";
  };

  return (
    <>
      {updateLoading && <Spinner />}
      {updatederror && <Alert variation="danger" child={error} />}
      <form onSubmit={submitForm}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name(longTitle)
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter Product Name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Category(shortTitle)
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter Category Name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Cost
          </label>
          <input
            type="number"
            className="form-control"
            id="CostPrice"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            placeholder="Enter Cost"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            mrp
          </label>
          <input
            type="number"
            className="form-control"
            id="mrp"
            value={mrp}
            onChange={(e) => setMrp(e.target.value)}
            placeholder="Enter Mrp"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            discount
          </label>
          <input
            type="text"
            className="form-control"
            id="discount"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Enter Discount"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Image
          </label>
          <input
            type="text"
            className="form-control"
            id="Imageurl"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Enter Image URL"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter Product Description"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Tag Line
          </label>
          <input
            type="text"
            className="form-control"
            id="Tagline"
            value={tagline}
            onChange={(e) => setTagline(e.target.value)}
            placeholder="Enter Product Tagline"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Count In stock
          </label>
          <input
            type="number"
            className="form-control"
            id="CountInStock"
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            placeholder="Enter Product Description"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Edit
        </button>
      </form>
    </>
  );
};

export default EditProduct;
