/******************* Edit Profile Component of Profile Page *******************/
import React from 'react';
import {Button, Input, message, Modal} from 'antd';
import {Avatar} from './Avatar';
import {addBioText} from '../../../userApi';

export class EditProfile extends React.Component {
    state = { visible: false, bioValue: this.props.appState.user.bioText };
    showModal = () => {
      this.setState({
        visible: true
      });
    };
    handleOk = e => {
      console.log(e);
      this.setState({
        visible: false
      });
      addBioText(this.state.bioValue).then(bioText => {
        if (bioText) {
          message.success("Biography updated!");
          this.props.appState.dispatch({
            type: "user/updateBioText",
            payload: this.state.bioValue
          });
        } else {
          message.error("Biography failed to update!");
        }
      });
      // callback to set state in Profile
      this.props.updateProfileState({
        bio: this.state.bioValue
      });
    };
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false
      });
    };
    onBioChange = e => {
      this.setState({
        bioValue: e.target.value
      });
    };
    render() {
      const { TextArea } = Input;
      return (
        <div>
          <Button icon="edit" onClick={this.showModal}>
            Edit Profile
          </Button>
          <Modal
            title="Edit Profile"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <Avatar
              updateProfileState={this.props.updateProfileState}
              appState={this.props.appState}
            />
            <p>Write a brief description about yourself</p>
            <TextArea
              rows={4}
              onChange={this.onBioChange}
              value={this.state.bioValue}
            />
          </Modal>
        </div>
      );
    }
  }