import React from "react";
import { Layout, Icon, Avatar, Dropdown } from "antd";
import logo from "./Pages/images/logo.png";
import {menu } from "./menu"
const { Header } = Layout;

export const LoggedInHeader = props => (
  <Header className="header-container">
    <div>
      <a href="./">
        <img src={logo} alt="logo" className="logo" />
      </a>
    </div>
    <div className="avatar-container">
      <Avatar shape="square" size="large" src={props.profileImage} />
      <Dropdown overlay={menu}>
        <Icon type="down" />
      </Dropdown>
    </div>
  </Header>
);