import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

import Join from './components/Join';
import Profile from './components/Profile';
import Login from './components/Login';
import Home from './components/Home';

const App = () => (
<Router>
  <div>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/join">Join</Link></li>
      <li><Link to="/Login">Login</Link></li>
      <li><Link to="/Profile">Profile</Link></li>
    </ul>

    <Route exact path="/" component={Home} />
    <Route path="/join" component={Join} />
    <Route path="/login" component={Login} />
    <Route path="/profile" component={Profile} />
    <Route path="/api/version" component={ApiVersion} />

  </div>
</Router>
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

export default App;
