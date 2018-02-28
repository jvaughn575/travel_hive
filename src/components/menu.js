import React from "react";
import { logoutUser } from "../userApi";
import { saveState } from "../models/localStorage";
import { app } from "./app";
import { Menu } from "antd";



const onLogOut = ({ key }) => {
  if (key === "1") {
    logoutUser();
    app._store.dispatch({ type: "user/logOutUser" }); // alternate way to connect to the app store/state dispatcher
    saveState(undefined);
  }
};

export const menu = (
  <Menu onClick={onLogOut}>
    <Menu.Item key="0">
      <a href="/profile">Profile</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="/login">Logout</a>
    </Menu.Item>
    <Menu.Divider />
  </Menu>
);



