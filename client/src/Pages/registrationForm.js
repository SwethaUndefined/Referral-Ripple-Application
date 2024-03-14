import React, { useState } from "react";
import { Row, Col, Typography, Input, Button, message } from "antd";
import "./registrationForm.css";
import { registerUser } from "../api"; // Assuming you have an API function for registering users

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contactNumber: "",
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
      const res = await registerUser(formData);
      message.success("Registration successful");
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);
    } catch (error) {
      message.error("Registration Error");
    }
  };
  const handleLoginClick = () => {
    window.location.href = "/";
  };
  return (
    <section className="main">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
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
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <i className="bx bxs-envelope"></i>
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
          <div className="input-box">
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
            <i className="bx bxs-phone"></i>
          </div>
          <button type="submit" className="btn">
            Register
          </button>
          <div className="login-link">
            <p>
              Already have an account?
              <a href="#" onClick={handleLoginClick}>
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegistrationForm;
