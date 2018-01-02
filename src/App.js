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

import {WrappedRegistrationForm} from './components/Pages/Join';
import {WrappedLoginForm} from './components/Pages/Login';
import {Inspiration} from './components/Pages/Inspiration';
import {Plan} from './components/Pages/Plan';
import {Experience} from './components/Pages/Experience';
import {Connect} from './components/Pages/Connect';

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
        <Route path="/plan" component={Plan} />
        <Route path="/experience" component={Experience} />
        <Route path="/connect" component={Connect} />
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
      mode="horizontal"
      defaultSelectedKeys={['1']}
      style={{ lineHeight: '64px',
               border: '1px solid #DCDCDD',
               padding: '0 25px',
               display: 'flex',
               justifyContent: 'flex-start',
            }}
    >
      <Menu.Item key="1"><Link to="/inspiration">Inspiration</Link></Menu.Item>
      <Menu.Item key="2"><Link to="/plan">Plan</Link></Menu.Item>
      <Menu.Item key="3"><Link to="/experience">Experience</Link></Menu.Item>
      <Menu.Item key="4"><Link to="/connect">Connect</Link></Menu.Item>
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
