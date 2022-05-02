import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { productItemDetails } from "../actions/productActions";
import { Rating } from "../components/Rating";
import Spinner from "../components/shared/Spinner";
import Alert from "../components/shared/Alert";
import { postCreate, deleteReviewAction } from "../actions/productActions";

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [comment, setComment] = useState("");

  const [rating, setRating] = useState(0.5);
  const increaseRating = (e) => {
    e.preventDefault();
    setRating(rating + 0.5);
  };
  const decreaseRating = (e) => {
    e.preventDefault();
    setRating(rating - 0.5);
  };

  const myPost = useSelector((state) => state.myPost);
  const postReviewHandler = () => {
    if (!localStorage.getItem("userInformation")) {
      window.alert("You must Login First ");
      setComment("");
      return;
    }
    // if Comment Box is empty
    if (comment.length === 0) {
      window.alert("Comment Box is Empty!");
      return;
    }
    // for first Comment
    if (product.review.length === 0) {
      dispatch(postCreate(rating, comment, id));
      setComment("");
      return;
    }
    // getting email from localStorage
    const localStorageEmail = JSON.parse(
      localStorage.getItem("userInformation")
    ).email;

    // Finding Email id in the product.review Array
    let emailCheck = product.review.find((p) => p.email === localStorageEmail);
    if (emailCheck) {
      window.alert("Already Reviewed");
      setComment("");
      return;
    }
    // 
    dispatch(postCreate(rating, comment, id));
    setComment("");
  };

  const deletePost = useSelector((state) => state.deletePost);
  const { loading: deleteLoading } = deletePost;
  // delete Your review
  const deleteReviewHandler = (newEmail) => {
    if (!localStorage.getItem("userInformation")) {
      window.alert("You must Login First to delete Post ");
      return;
    }
    // getting email from localStorage
    const localStorageEmail = JSON.parse(
      localStorage.getItem("userInformation")
    ).email;
    if (newEmail !== localStorageEmail) {
      window.alert("You dont Have permission to delete this post");
      return;
    }
    // Finding Email id in the product.review Array
    let emailCheck = product.review.find((p) => p.email === localStorageEmail);
    if (emailCheck) {
      dispatch(deleteReviewAction(id));

      window.alert("Post Deleted");
      return;
    }
    if (!emailCheck) {
      window.alert("You dont Have permission to delete this post");
      return;
    }
  };

  const starsCount = product.review && product.review.map((p) => p.rating);
  const starsCountSum =
    product.review &&
    starsCount.reduce((acc, red) => {
      return acc + Number(red);
    }, 0);
  const starCountNet =
    product.review && Math.ceil(starsCountSum / product.review.length);

  useEffect(() => {
    dispatch(productItemDetails(id));
  }, [dispatch, id, myPost, deleteLoading]);

  let navigate = useNavigate();
  const handleAddToCart = () => {
    navigate(`/cart/${id}?quantity=${quantity}`);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variation={"danger"} child={error} />
      ) : (
        <div className="container my-3">
          <Link
            to="/"
            style={{ textDecoration: "none", color: "black" }}
            className="btn border border-dark"
          >
            Go Back
          </Link>
          <div className="row">
            <div className="col-md-6 text-center my-2">
              <img src={product.detailUrl} alt="" />
            </div>
            <div className="col-md-3 my-2">
              {product.title ? (
                product.title.longTitle.split(" ").length === 1 ? (
                  <h3 className="text-break">{product.title.longTitle}</h3>
                ) : (
                  <h3>{product.title.longTitle}</h3>
                )
              ) : (
                ""
              )}
              <hr />
              <div>
                <Rating
                  value={
                    product.review && product.review.length > 1
                      ? starCountNet
                      : product.review && product.review.length === 1
                      ? Number(product.review[0].rating)
                      : starCountNet
                  }
                  text={`${product.review && product.review.length} reviews`}
                />
                <hr />
                <h5 className="my-1 mx-1">
                  MRP:{product.price && product.price.mrp}
                </h5>
                <h5 className="my-1 mx-1">
                  Price:{product.price && product.price.cost}
                </h5>
                <h5 className="my-1 mx-1">
                  discount:{product.price && product.price.discount} off
                </h5>
              </div>
              <hr />
              <strong>{product.tagline}</strong>

              <div>{product.description}</div>
            </div>
            <div className="col-md-3 my-2">
              <div className="row border border-dark">
                <div className="col-md-6">
                  <h5>Status:</h5>
                </div>
                <div className="col-md-6">
                  <h5>
                    {product.countInStock > 0 ? "In Stock" : "out of Stock"}
                  </h5>
                </div>
                <hr />
                {product.countInStock > 0 && (
                  <>
                    <div className="col-md-6">Quantity</div>
                    <form
                      className="col-md-6"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    >
                      <select>
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </form>
                  </>
                )}

                <div className="col-md-12 my-3">
                  <button
                    className="w-100 btn btn-dark"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={() => handleAddToCart()}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
              <div className="cotainer my-4 ">
                <div className="row">
                  <div className="col-md-6 text-center">
                    <h2>Reviews</h2>
                  </div>
                  <div className="col-md-6 text-center">
                    <button
                      className="btn btn-dark "
                      onClick={postReviewHandler}
                    >
                      Post
                    </button>
                  </div>
                  <form className="container col-md-12 my-3">
                    <div className="row">
                      <input
                        className="col-md-6"
                        placeholder=" comment Here"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></input>

                      <div className="col-md-6">
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12">{rating}&nbsp;Star</div>

                            <button
                              className="col-md-6 btn-dark"
                              onClick={increaseRating}
                              disabled={rating === 5}
                            >
                              +
                            </button>

                            <button
                              className="col-md-6 btn-dark"
                              onClick={decreaseRating}
                              disabled={rating === 0.5}
                            >
                              -
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                  {product.review &&
                    product.review.map((product, index) => (
                      <div
                        className="col-md-12 container border border-dark my-3"
                        key={`Sno.${index}`}
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <strong>Name&nbsp;:&nbsp;</strong>
                            {product.name}
                          </div>

                          <div className="col-md-8">
                            <Rating
                              value={Number(product.rating)}
                              text={`stars`}
                            />
                          </div>
                          {/*  */}

                          <div className="col-md-4">
                            <span>Delete</span>&nbsp;
                            <FontAwesomeIcon
                              style={{ color: "green" }}
                              icon={faTrash}
                              type="button"
                              onClick={() => deleteReviewHandler(product.email)}
                            ></FontAwesomeIcon>
                          </div>
                          <div className="col-md-12">
                            <strong>Comment&nbsp;:&nbsp;</strong>
                            {product.comment}
                          </div>
                          <div className="col-md-12">
                            <strong>Post On&nbsp;:&nbsp;</strong>
                            {product.createdAt.substring(0, 10)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
