
import React, { Component } from "react";

export class ApiVersion extends Component {
  state = { apiVersion: [] };
  componentDidMount() {
    fetch("/api/version")
      .then(res => res.json())
      .then(apiVersion => this.setState({ apiVersion }));
  }
  render() {
    return (
      <div>
        <p>{this.state.apiVersion.version}</p>
      </div>
    );
  }
}