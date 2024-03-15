import React, { useEffect, useState } from "react";
import { Row, Col, Typography } from "antd";
import { getUsers } from "../api";
import { useLocation } from "react-router-dom";


const Dashboard = () => {
  const [usersList, setUsersList] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("username");
   
  useEffect(() => {
    getUsers()
      .then((res) => {
        setUsersList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log({usersList})
  return (
    <section>
      <Row>
        <Col span={24}>
          <Typography>Welcome to {username}!</Typography>
        </Col>
        <Col span={24}></Col>
        <Col span={24}></Col>
      </Row>
    </section>
  );
};

export default Dashboard;
