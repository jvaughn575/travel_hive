import React from 'react';
import {
    BrowserRoute as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'

import { Modal, Button } from 'antd';
import dva, { connect } from 'dva';

/* Purpose: Only allow access to private routes if user is authenticated. 
 *  Inspiration: https://tylermcginnis.com/react-router-protected-routes-authentication
 */
class JoinModal extends React.Component {
  state = { visible: true }
  showModal = () => {
    this.setState({
      visible: true,
    });    
  }
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
    this.props.history.push("/join");
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    return (
      <div>        
        <Modal
          title="Must be logged in to access this feature"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText = "JOIN"
          onCancel={this.handleCancel}          
        >
          <p className = "protected-route-modal">Please join <span style={{color: "#ffc000"}}>Travel</span>Hive&trade; to use all the features, like planning
              and sharing your experiences.
          </p>
          
        </Modal>
      </div>
    );
  }
}

export const PrivateRoute = ({component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (                
        rest.appState.user.isLoggedIn || false === true
            ? <Component {...props} />
            : <JoinModal {...props} />
    )} />    
)



