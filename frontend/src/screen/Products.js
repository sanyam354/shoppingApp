import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import { listProducts } from "../actions/productActions";
import Spinner from "../components/shared/Spinner";
import Alert from "../components/shared/Alert";
import Filters from "./Filters";

const Products = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, products } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, userLogin]);

  return (
    <>
      <Filters />
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variation={"danger"} child={error} />
      ) : (
        <div className="container">
          <div className="row">
            {products &&
              products.map((product) => (
                <div className="col-md-4 my-3 " key={`${product._id}`}>
                  <ProductItem product={product} />
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
};
export default Products;
