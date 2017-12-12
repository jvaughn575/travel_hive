import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <Router>
            <div>
                <Route path="/" component={Home}/>
                <Route path="/api/version" component={ApiVersion} />
            </div>
      </Router>
    );
  }
}

class Home extends Component{
    render(){
        return(
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1 className="App-title">TRAVEL HIVE</h1>
              </header>
              <p className="App-intro">
                Get your travel on!
              </p>
            </div>
        )
    }
}

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
