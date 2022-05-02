import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/shared/Alert";
import Spinner from "../components/shared/Spinner";
import { login } from "../actions/userAction";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  let location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { loading, error, userLoginInfo } = userLogin;

  useEffect(() => {
    if (userLoginInfo) {
      navigate(redirect);
    }
  }, [navigate, userLoginInfo, redirect]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4 my-5" style={{ backgroundColor: "#d5efc2" }}>
          <h1 className="text-center">SIGN IN</h1>
          {error && (
            <Alert variation={"danger"} child="Invalid login details" />
          )}
          {loading && <Spinner />}
          <form onSubmit={submitHandler}>
            <div className="mx-auto my-3 col-md-8">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mx-auto my-3 col-md-8">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mx-auto my-3 col-md-8">
              <button type="submit" className="btn btn-success my-3">
                Submit
              </button>
            </div>
          </form>
          <div className="mx-auto my-3 col-md-8">
            New Customer ?
            <Link
              to={redirect ? `/register?redirect=${redirect}` : "/register"}
              style={{ color: "black" }}
            >
              click to Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
