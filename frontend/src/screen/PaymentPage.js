import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { savePaymentMethod } from "../actions/cartActions";
import CheckOutPath from "../components/shared/CheckOutPath";

const PaymentPage = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress) {
    navigate("/shipping");
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <>
      <CheckOutPath path1 path2 path3 />
      <div className="container my-3">
        <h1 className="mx-2 my-2 col-md-4">Payment Method</h1>
        <h3 className="my-1 col-md-4 text-center btn-success p-4 ">
          Select Payment Method
        </h3>
        <form onSubmit={submitHandler} className="col-md-4 my-4">
          <div className="form-check ">
            <input
              className="form-check-input"
              style={{ backgroundColor: "green", borderColor: "green" }}
              type="radio"
              name="paymentMethod"
              id="paypal"
              value="paypal"
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label className="form-check-label" htmlFor="paypal">
              <div>PayPal or Credit Card</div>
            </label>
          </div>

          <button type="submit" className="btn  btn-success p-2 my-4 ">
            Continue
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentPage;
