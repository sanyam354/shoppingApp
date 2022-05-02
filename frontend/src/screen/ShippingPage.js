import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import {  useNavigate } from "react-router-dom";
import CheckOutPath from "../components/shared/CheckOutPath";

const ShippingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <div className="container ">
      <CheckOutPath path1={"path1"} path2={"path2"} />
      <form onSubmit={submitHandler} className="col-md-6 my-2">
        <h1>Shipping Address</h1>
        <div className="my-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter Address"
            aria-describedby="address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="my-3">
          <label htmlFor="City" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="City"
            placeholder="Enter City"
            aria-describedby="City"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="my-3">
          <label htmlFor="postalcode" className="form-label">
            Postal Code
          </label>
          <input
            type="number"
            className="form-control"
            id="postalcode"
            placeholder="Enter Postal Code"
            aria-describedby="postalcode"
            required
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </div>
        <div className="my-3">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            placeholder="Enter Country"
            aria-describedby="country"
            required
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-success my-3">
          Continue
        </button>
      </form>
    </div>
  );
};

export default ShippingPage;
