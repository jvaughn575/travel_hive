import dva, { connect } from "dva";
import React, { Component } from "react";
import "./App.css";
import { Layout, Menu, Icon, Avatar, Dropdown } from "antd";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { WrappedRegistrationForm } from "./components/Pages/Join";
import { WrappedLoginForm } from "./components/Pages/Login";
import { ProfilePage } from "./components/Pages/Profile";
import { InspirationPage } from "./components/Pages/Inspiration";
import { Plan } from "./components/Pages/Plan";
import { Experience } from "./components/Pages/Experience";
import { Connect } from "./components/Pages/Connect";
import { Explore } from "./components/Pages/Explore";

import user from "./models/user";
import inspiration from "./models/inspiration";

import {ApiVersion } from "./components/apiVersion"
import {AppHeader } from "./components/appHeader"


const { Header, Footer, Content } = Layout;

const DefaultLayout = ({ children }) => (
  <div>
    <AppHeader />
    <Layout>
      <Content style={contentContainer}>
        <div className="wrapper" style={contentStyle}>
          {children}
          <div className="push" />
        </div>
      </Content>
    </Layout>
    <AppFooter />
  </div>
);

export const App = connect(({ user, inspiration }) => ({
  user,
  inspiration
}))(function(props) {
  return (
    <Router>
      <DefaultLayout>
        <div>
          <Route path="/join" component={WrappedRegistrationForm} />
          <Route path="/login" component={WrappedLoginForm} />
          <Route
            path="/profile"
            render={() => <ProfilePage appState={props} />}
          />
          <Route path="/inspiration" component={InspirationPage} />
          <Route path="/plan" component={Plan} />
          <Route path="/experience" component={Experience} />
          <Route path="/connect" component={Connect} />
          <Route path="/explore" component={Explore} />
          <Route path="/api/version" component={ApiVersion} />
        </div>
      </DefaultLayout>
    </Router>
  );
});




export const AppFooter = () => (
  <Layout>
    <Footer className="footer" style={footerStyle}>
      TravelHive ©2018 Created by ID8
    </Footer>
  </Layout>
);

var contentContainer = {
  padding: "0 50px"
};

var contentStyle = {
  textAlign: "center",
  background: "#fff",
  padding: 24,
  minHeight: 600
};

var footerStyle = {
  textAlign: "center"
};
