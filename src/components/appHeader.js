import { Layout, Menu, Icon, Avatar, Dropdown } from "antd";
import { Link } from "react-router-dom";
import React from "react";
import dva, { connect } from "dva";
import {JoinLoginHeader } from "./joinLoginHeader"
import {LoggedInHeader } from "./loggedInHeader"


export const AppHeader = connect(({ user }) => ({
  user
}))(function(props) {
  return (
    <Layout>
      {props.user.isLoggedIn ? (
        <LoggedInHeader profileImage={props.user.profileImage} />
      ) : (
        JoinLoginHeader
      )}

      <div className="menu">
        <Menu mode="horizontal" defaultSelectedKeys={["1"]} style={menuStyle}>
          <Menu.Item key="1">
            <Link to="/inspiration">
              <Icon type="bulb" />Inspiration
            </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/plan">
              <Icon type="compass" />Plan
            </Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/experience">
              <Icon type="global" />Experience
            </Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link to="/connect">
              <Icon type="sync" />Connect
            </Link>
          </Menu.Item>
          <Menu.Item key="5" id="explore">
            <Link to="/explore">
              <Icon type="search" />Explore
            </Link>
          </Menu.Item>
        </Menu>
      </div>
    </Layout>
  );
});




var menuStyle = {
  lineHeight: "64px",
  border: "1px solid #DCDCDD",
  padding: "0 25px",
  display: "flex",
  justifyContent: "flex-start"
};
