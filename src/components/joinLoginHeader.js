import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

export const JoinLoginHeader = (
  <Header className="header-container">
    <div>
      <a href="./">
        <img src={process.env.PUBLIC_URL + 'images/logo.png'} alt="logo" className="logo" />
      </a>
    </div>

    <div className="links">
      <Link to="/join">Join </Link>
      /
      <Link to="/login"> Login</Link>
    </div>
  </Header>
);
