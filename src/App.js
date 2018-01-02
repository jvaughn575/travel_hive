import React, { Component } from 'react';
import './App.css';
import logo from './components/logo.png';
import {
  Layout,
  Menu,
} from 'antd';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

import {WrappedRegistrationForm} from './components/Join';
import {Inspiration} from './components/Inspiration';
import {WrappedLoginForm} from './components/Login';

const DefaultLayout = ({children}) => (
  <div>
     <AppHeader />
      <br />

     {children}
     <AppContent />
      <br />
     <AppFooter />
 </div>
);

const App = () => (
<Router>
<DefaultLayout>
  <div>
        <Route path="/join" component={WrappedRegistrationForm} />
        <Route path="/login" component={WrappedLoginForm} />
        <Route path="/inspiration" component={Inspiration} />
        <Route path="/api/version" component={ApiVersion} />
  </div>
</DefaultLayout>
</Router>
);

const { Header, Footer, Content } = Layout;

export const AppHeader = () => (
  <Layout>
  <Header className='header-container'>
    <div>
        <a href='./'><img src={logo} alt="logo"className='logo'/></a>
    </div>
    <div className="links">
        <Link to="/join">Join </Link>
            /
        <Link to="/login">  Login</Link>

    </div>
  </Header>

  <div className="menu">
    <Menu
      theme="light"
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px'}}
    >
      <Menu.Item key="1"><Link to="/inspiration">Inspiration</Link></Menu.Item>
      <Menu.Item key="2">Plan</Menu.Item>
    </Menu>
  </div>

  </Layout>
 );

export const AppContent = () => (
  <Layout>
  <Content style={contentStyle}>
    <div style={{ textAlign: 'center', background: '#fff', padding: 24, minHeight: 280 }}>
    Content Goes Here
    </div>
  </Content>
  </Layout>
);

export const AppFooter = () => (
<Layout>
  <Footer style={footerStyle}>
  TravelHive ©2018 Created by ID8
  </Footer>
</Layout>
);

class ApiVersion extends Component {
    state = { apiVersion: [] }
    componentDidMount() {
        fetch('/api/version')
            .then(res => res.json())
            .then(apiVersion => this.setState({ apiVersion }));
    }
    render(){
        return(
            <div>
                <p>{ this.state.apiVersion.version }</p>
            </div>
        );
    }
}

var contentStyle = {
  padding: '0 50px'
}

var footerStyle = {
  textAlign: 'center'
}

export default App;
