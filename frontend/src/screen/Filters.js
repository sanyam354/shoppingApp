import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  listProducts,
  filterProduct,
  filterCategoryProduct,
} from "../actions/productActions";
const Filters = () => {
  const dispatch = useDispatch();
  const [searchKey, setSearchKey] = useState("");
  const [category, setCategory] = useState("");
  useEffect(() => {
    if (category === "all") {
      dispatch(listProducts());
    } else if (category !== "") {
      dispatch(filterCategoryProduct(category));
    }
  }, [dispatch, category]);

  return (
    <>
      <div className="container">
        <div className="row">
          <form className="my-2  bg-success p-2 text-dark bg-opacity-25 col-md-6">
            <div className="row my-4">
              <div className="mb-3 col-md-8">
                <input
                  type="text"
                  className="form-control"
                  id="searchKey"
                  placeholder="search any product"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  //   aria-describedby="emailHelp"
                />
              </div>

              <div className="col-md-2">
                <button
                  type="button"
                  onClick={() => dispatch(filterProduct(searchKey))}
                  className="btn btn-success "
                >
                  Search
                </button>
              </div>
            </div>
            <div className=" col-md-4"></div>
          </form>
          <form className="my-2 bg-success p-2 text-dark bg-opacity-25 col-md-6">
            <div className="row">
              <div className="mb-3 col-md-8 my-4">
                <select
                  className="form-select"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}
                >
                  <option>all</option>
                  <option>mrp</option>
                  <option>cost</option>
                </select>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Filters;
