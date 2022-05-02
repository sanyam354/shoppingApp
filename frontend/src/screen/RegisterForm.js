import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/shared/Alert";
import Spinner from "../components/shared/Spinner";
import { register } from "../actions/userAction";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [name, setName] = useState("");

  let navigate = useNavigate();
  let location = useLocation();
  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userLoginInfo } = userRegister;

  // 
  useEffect(() => {
    if (userLoginInfo) {
      navigate(redirect);
    }
  }, [navigate, userLoginInfo, redirect]);
  //
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password and confirm Password must be same");
    } else {
      dispatch(register(name, email, password));
    }

  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-4 my-5" style={{ backgroundColor: "#d5efc2" }}>
          <h1 className="text-center">New Registeration</h1>
          {error && <Alert variation={"success"} child={error} />}
          {loading && <Spinner />}
          {message && <Alert variation={"danger"} child={message} />}
          <form onSubmit={submitHandler}>
            <div className="mx-auto my-3 col-md-8">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mx-auto my-3 col-md-8">
              <label htmlFor="email" className="form-label">
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
              <label htmlFor="exampleInputPassword1" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmpassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="mx-auto my-3 col-md-8">
              <button type="submit" className="btn btn-success my-3">
                Submit
              </button>
            </div>
          </form>
          <div className="mx-auto my-3 col-md-8">
            Already Have an account !
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              style={{ color: "black" }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
