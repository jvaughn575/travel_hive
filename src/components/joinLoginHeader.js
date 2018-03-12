import React from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import logo from "./Pages/images/logo.png";
// import logo from '../../public/images/logo.png'
// const logo = <img src={process.env.PUBLIC_URL + '/images/logo.png'} />;

const { Header } = Layout;

export const JoinLoginHeader = (
  <Header className="header-container">
    <div>
      <a href="./">
        <img src={logo} alt="logo" className="logo" />
      </a>
    </div>

    <div className="links">
      <Link to="/join">Join </Link>
      /
      <Link to="/login"> Login</Link>
    </div>
  </Header>
);
