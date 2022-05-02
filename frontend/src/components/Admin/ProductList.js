import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Spinner from "../shared/Spinner";
import Alert from "../shared/Alert";
import { deleteProduct, listProducts } from "../../actions/productActions";
import { Link } from "react-router-dom";

const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, products } = productList;
  console.log(products);
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch, userLogin]);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert variation={"danger"} child={error} />
      ) : (
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th scope="col">Images</th>
              <th scope="col">Products</th>
              <th scope="col">Cost</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {products &&
              products.map((product, index) => (
                <tr key={`SNo.${index}`}>
                  <td>
                    <img
                      src={product.url}
                      alt="logo"
                      style={{ width: "100px", height: "100px" }}
                    />
                  </td>
                  <td>{product && product.title.longTitle}</td>
                  <td>{product && product.price.cost}</td>
                  <td>
                    <Link to={`/admin/editProduct/${product._id}`}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className="mx-2"
                        style={{ color: "green", cursor: "pointer" }}
                      />
                    </Link>
                    <Link to="">
                      <FontAwesomeIcon
                        icon={faTrash}
                        className="mx-2"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => {
                          dispatch(deleteProduct(product._id));
                        }}
                      />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default ProductList;
