import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from 'react-router-dom'

import {WrappedRegistrationForm} from './components/Join';
import {Profile} from './components/Profile';
import {WrappedLoginForm} from './components/Login';
import {Home} from './components/Home';

const App = () => (
<Router>
  <div>
      <Route exact path="/" component={Home} />
      <Route path="/join" component={WrappedRegistrationForm} />
      <Route path="/login" component={WrappedLoginForm} />
      <Route path="/profile" component={Profile} />
      <Route path="/api/version" component={ApiVersion} />

    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/join">Join</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/profile">Profile</Link></li>
    </ul>

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
