import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import backgroundIMG from "../Image/banner1.jpg";
import styles from "./Login.module.css";
import Messagerlogin from "../Message/Messagerlogin";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dataRegister = JSON.parse(localStorage.getItem("register")) || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitHandle = () => {
    //thông báo khi trường email bỏ trống
    if (formData.email === "") {
      setShowErrorMessage(true);
      setErrorMessage("Vui lòng nhập email.");
      return;
    }

    const user = dataRegister.find(
      (element) => element.email === formData.email
    );
    // ko đúng email => báo lỗi
    if (!user) {
      setShowErrorMessage(true);
      setErrorMessage("Sai email.");
      return;
    }
    //bao loi password bo trong
    if (formData.password === "") {
      setShowErrorMessage(true);
      setErrorMessage("Vui lòng nhập password.");
      return;
    }
    //bao loi sai password
    if (formData.password !== user.password) {
      setShowErrorMessage(true);
      setErrorMessage("Sai password.");
      return;
    }
    //luu du lieu login vao localstorage
    localStorage.setItem("login", JSON.stringify(formData));
    setShowErrorMessage(false);
    navigate("/shop");
  };
  //chuyen trang register
  const signupHandler = () => {
    navigate("/register");
  };

  return (
    <>
      <img className={styles.imgbg} src={backgroundIMG} alt="backgroundIMG" />
      <div className={styles.formsign}>
        <h2>Sign In</h2>
        <form onSubmit={submitHandle}>
          <div className="form-group"></div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
              style={{ width: "300px", height: "50px", borderRadius: "0px" }}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
              style={{ width: "300px", height: "50px", borderRadius: "0px" }}
            />
          </div>
          <div className="d-grid col-12 mx-auto">
            <button
              className="btn btn-secondary "
              type="button"
              style={{ marginTop: "20px" }}
              onClick={submitHandle}
            >
              Sign In
            </button>
          </div>
          {/*hiển thị thông báo tin nhắn khi showErrorMessage =true  */}
          {showErrorMessage && <Messagerlogin messager={errorMessage} />}
          <p style={{ marginTop: "10px", color: "black" }}>
            Sign Up?{" "}
            <span
              onClick={signupHandler}
              style={{
                color: "red",
                cursor: "pointer",
              }}
            >
              Click
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
