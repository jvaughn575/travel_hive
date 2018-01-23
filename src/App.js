import dva, { connect } from 'dva';
import React, { Component } from 'react';
import './App.css';
import logo from './components/Pages/images/logo.png';
import {
  Layout,
  Menu,
  Icon,
  Avatar,
} from 'antd';

import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

import {WrappedRegistrationForm} from './components/Pages/Join';
import {WrappedLoginForm} from './components/Pages/Login';
import {ProfilePage} from './components/Pages/Profile';
import {InspirationPage} from './components/Pages/Inspiration';
import {Plan} from './components/Pages/Plan';
import {Experience} from './components/Pages/Experience';
import {Connect} from './components/Pages/Connect';

// Create dva app
export const app = dva();

// Create model
app.model({
  namespace: 'isLoggedIn',
  state: false,
  reducers: {
    yes (isLoggedIn) { return (isLoggedIn ? isLoggedIn : !isLoggedIn)},
    no (isLoggedIn) { return (isLoggedIn ? !isLoggedIn : isLoggedIn)},
  },

});


console.log(app);

const { Header, Footer, Content } = Layout;

const DefaultLayout = ({children}) => (
  <div>
    <AppHeader />
    <Layout>
      <Content style={contentContainer}>
        <div class="wrapper" style={contentStyle}>
          {children}
           <div class="push"></div>
         </div>
      </Content>
    </Layout>
    <AppFooter />
  </div>
);

export const App = () => (
<Router>
<DefaultLayout>
  <div>
        <Route path="/join" component={WrappedRegistrationForm} />
        <Route path="/login" component={WrappedLoginForm} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/inspiration" component={InspirationPage} />
        <Route path="/plan" component={Plan} />
        <Route path="/experience" component={Experience} />
        <Route path="/connect" component={Connect} />
        <Route path="/api/version" component={ApiVersion} />
  </div>
</DefaultLayout>
</Router>
);

const JoinLoginHeader = (

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
);

const LoggedInHeader = (
  <Header className='header-container'>
      <div>
          <a href='./'><img src={logo} alt="logo"className='logo'/></a>
      </div>
      <div className='avatar-container'>
        <Avatar shape="square" size="large" src="https://robohash.org/User" />
      </div>

    </Header>
);

export const AppHeader = connect(({ isLoggedIn }) => ({
    isLoggedIn
}))(function(props){
  console.log("App Header",props);
  return (
    <Layout>
    {props.isLoggedIn ? LoggedInHeader : JoinLoginHeader}

    <div className="menu">
      <Menu
        mode="horizontal"
        defaultSelectedKeys={['1']}
        style={menuStyle}
      >
        <Menu.Item key="1"><Link to="/inspiration"><Icon type="bulb" />Inspiration</Link></Menu.Item>
        <Menu.Item key="2"><Link to="/plan"><Icon type="compass" />Plan</Link></Menu.Item>
        <Menu.Item key="3"><Link to="/experience"><Icon type="global" />Experience</Link></Menu.Item>
        <Menu.Item key="4"><Link to="/connect"><Icon type="sync" />Connect</Link></Menu.Item>
      </Menu>
    </div>
    </Layout>
  );
});

export const AppFooter = () => (
<Layout>
  <Footer class="footer" style={footerStyle}>
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

var menuStyle = {
  lineHeight: '64px',
  border: '1px solid #DCDCDD',
  padding: '0 25px',
  display: 'flex',
  justifyContent: 'flex-start'
}

var contentContainer = {
  padding: '0 50px'
}

var contentStyle = {
  textAlign: 'center',
  background: '#fff',
  padding: 24,
  minHeight: 600
}

var footerStyle = {
  textAlign: 'center'
}
