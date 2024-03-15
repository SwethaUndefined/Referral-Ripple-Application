import React, { useState } from "react";
import { Row, Col, Typography, Input, Button, message } from "antd";
import "./login.css";
import { loginCheck } from "../api";
const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginCheck(formData);
      message.success("Login Successfull");
      setTimeout(() => {
        window.location.href = "/dashboard?username=" + formData.username;
      }, 1000);
    } catch (error) {
      message.error("Please Register to continue");
      setTimeout(() => {
        window.location.href = "/register";
      }, 2000);
    }
  };
  
  const handleRegisterClick = () => {
    window.location.href = "/register";
  };
  return (
    <section className="main">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input-box">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <i className="bx bxs-user"></i>
          </div>
          <div className="input-box">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <i className="bx bxs-lock-alt"></i>
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <div className="register-link">
            <p>
              Dont have an account? <a href="#" onClick={handleRegisterClick}>Register</a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
