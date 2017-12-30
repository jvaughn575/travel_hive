import React, { Component } from 'react';
import './App.css';
import logo from './components/logo.png';

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
     <Header />
     {children}
     This is a FOOTER
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

    <ul>
      <li><Link to="/join">Join</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/inspiration">Inspiration</Link></li>
    </ul>

  </div>
</DefaultLayout>
</Router>
);

export const Header = ({ children }) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
    </header>

    <p className="App-intro">
            Inspire Your Inner Explorer​
    </p>
    {children}
  </div>
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
