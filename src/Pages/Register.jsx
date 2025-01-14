import backgroundIMG from "../Image/banner1.jpg";
import Messagerlogin from "../Message/Messagerlogin";
import styles from "./Register.module.css";

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [errorMessager, setErrorMessager] = useState(true);
  const [messager, setMessager] = useState("");

  //xử dụng hook useState để cập nhật dữ liệu
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //sự kiên click signup
  const signUpHandle = () => {
    let storedData = JSON.parse(localStorage.getItem("register")) || [];
    if (!Array.isArray(storedData)) {
      storedData = [storedData];
    }
    //dinh dang email kieu abc@abc.abc
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessager("email khong dung dinh dang (abc@abc.com).");
      setErrorMessager(true);
      return;
    }
    //password it hon 8 ky tu bao loi
    if (formData.password.length < 8) {
      setMessager("password co hon 8 ky tu");
      setErrorMessager(true);
      return;
    }
    //kiểm tra email trong mảng localstorage
    const isEmailExists = storedData.some(
      (user) => user.email === formData.email
    );
    //nếu đã có dữ liệu
    if (isEmailExists) {
      alert("Email đã tồn tại. Vui lòng sử dụng email khác.");
    } else {
      //thêm dữ liệu vào mảng khi ko trung dữ liệu
      storedData.push(formData);
      //save localstorage
      localStorage.setItem("register", JSON.stringify(storedData));
      alert("Đăng ký thành công");
      navigate("/login");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  //chuyển hướng về trong login khi đăng ký thành công
  const siginHandler = () => {
    navigate("/login");
  };

  return (
    <>
      <>
        <img className={styles.imgbg} src={backgroundIMG} alt="backgroundIMG" />
        <div className={styles.formsign}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="fullname"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                className="form-control"
                required
                style={{ width: "300px", height: "50px", borderRadius: "0px" }}
              />
            </div>
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
            <div className="form-group">
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                required
                style={{ width: "300px", height: "50px", borderRadius: "0px" }}
              />
            </div>
            {errorMessager && <Messagerlogin messager={messager} />}
            <div class="d-grid col-12 mx-auto">
              <button
                class="btn btn-secondary "
                type="button"
                style={{ marginTop: "20px" }}
                onClick={signUpHandle}
              >
                Sign Up
              </button>
            </div>

            <p style={{ marginTop: "10px", color: "black" }}>
              Login?{" "}
              <span
                onClick={siginHandler}
                style={{ color: "red", cursor: "pointer" }}
              >
                Click
              </span>
            </p>
          </form>
        </div>
      </>
    </>
  );
};

export default Register;
