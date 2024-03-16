import React, { useEffect, useState } from "react";
import { Row, Col, Typography, Input, Space, Avatar, Card, Table } from "antd";
import { useLocation } from "react-router-dom";
import "./dashboard.css";
import { UserOutlined } from "@ant-design/icons";
import { getuserInfo, fetchReferralUsers } from "../api";
const { Search } = Input;
const { Column } = Table;

const Dashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
  const [userData, setUserData] = useState({});
  const [referralData, setReferralData] = useState({});
  const [referrlUserLsit, setReferrlUserLsit] = useState([]);
  useEffect(() => {
    getInfo();
  }, []);
  const getInfo = () => {
    getuserInfo(username)
      .then((res) => {
        setUserData(res.userData);
        setReferralData(res.referralData);
        setReferrlUserLsit(res.referredUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log({userData})
  console.log({ referrlUserLsit });
  return (
    <section className="dashboard-section">
      <Row>
        <Col span={24} className="header">
          <Space>
            <Avatar
              size="large"
              icon={<UserOutlined />}
              className="UserOutlined"
            />
            <Typography className="name">{username}!</Typography>
          </Space>
        </Col>
        <Col span={1}></Col>
        <Col span={22} className="userInfo">
          <Card title="User Information " bordered={false}>
            <Row>
              <Col span={12}>
                <Typography>Email : {userData.email}</Typography>
              </Col>
              <Col span={12} className="points">
                <Typography className="points-text">
                  Points : {referralData.points}
                </Typography>
              </Col>
              <Col span={12}>
                <Typography>Phone Number : {userData.contactNumber}</Typography>
              </Col>
              <Col span={12} className="points">
                <Typography>
                  Referral Code : {referralData.referralCode}
                </Typography>
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={1}></Col>
        
        <Col span={24} className="heading">
          <Typography className="text">Referral User List</Typography>
        </Col>
        <Col span={1}></Col>
        <Col span={22} style={{ display: "flex", overflowX: "auto" }}>
          {referrlUserLsit.map((user, index) => (
            <Card key={index} style={{ marginRight: 16 }}>
              <Typography>Username: {user.username}</Typography>
              <Typography>Contact Number: {user.contactNumber}</Typography>
            </Card>
          ))}
        </Col>
      </Row>
    </section>
  );
};

export default Dashboard;
