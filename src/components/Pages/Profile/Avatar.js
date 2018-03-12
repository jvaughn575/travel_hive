/******************* Avatar Component of Profile Page *******************/
import React, {Component} from 'react';
import {message,Icon,Upload} from 'antd';
import {beforeUpload,getBase64} from "./profileHelper";
import {addProfilePhoto} from "../../../userApi";

export class Avatar extends React.Component {
    state = {
      loading: false
    };
    handleChange = info => {
      if (info.file.status === "done") {
        getBase64(info.file.originFileObj).then(imageUrl => {
          message.success("Profile image updated!");
          this.props.appState.dispatch({
            type: "user/updateProfileImage",
            payload: imageUrl
          }); // antd dva update to user profile image state
          this.setState({
            imageUrl,
            loading: false
          });
          this.props.updateProfileState({ pic: imageUrl });
        });
      }
  
      if (info.file.status === "uploading") {
        this.setState({ loading: true });
        return;
      }
  
      if (info.file.status === "error") {
        message.error("Profile image update failed!");
        this.setState({ loading: false });
        return;
      }
    };
    render() {
      const uploadButton = (
        <div>
          <Icon type={this.state.loading ? "loading" : "plus"} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      const imageUrl = this.state.imageUrl;
      return (
        <Upload
          name="avatar"
          customRequest={addProfilePhoto}
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="/api/profile"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          {imageUrl ? (
            <img src={imageUrl} className="upload-preview" alt="image preview" />
          ) : (
            uploadButton
          )}
        </Upload>
      );
    }
  }