import React, { useState } from "react";
import { message } from "antd";
import "./registrationForm.css";
import { registerUser } from "../api";
import Dashboard from "./dashboard";
const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    contactNumber: "",
  });
  const [referralCode, setReferralCode] = useState("");
  const [userHasReferralCode, setUserHasReferralCode] = useState(false);

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
      const formDataToSend = {
        contactNumber: formData.contactNumber,
        email: formData.email,
        password: formData.password,
        username: formData.username,
        referralCode: userHasReferralCode && referralCode.trim() !== "" ? referralCode.trim() : null,
        automaticReferralCode: generateReferralCode()
      };
  
      const res = await registerUser(formDataToSend);
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

  const handleReferralCodeChange = (e) => {
    const code = e.target.value;
    setReferralCode(code);
    setUserHasReferralCode(!!code); 
  };

  const generateReferralCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const codeLength = 6;
    let referralCode = '';
    for (let i = 0; i < codeLength; i++) {
      referralCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    setReferralCode(referralCode);
    setUserHasReferralCode(false); 
    return referralCode;
  };

  const handleGetReferralCode = () => {
    generateReferralCode();
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
          <div className="input-box">
            <input
              type="text"
              name="referralCode"
              placeholder="Have Referral Type here"
              value={referralCode}
              onChange={handleReferralCodeChange}
            />
            {!userHasReferralCode && (
              <button type="button" onClick={handleGetReferralCode}>
                Get Referral
              </button>
            )}
            <i className="bx bx-user"></i>
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
      <Dashboard username={formData.username} />
    </section>
  );
};

export default RegistrationForm;
