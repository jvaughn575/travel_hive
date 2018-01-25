import React, { Component } from 'react';
import map from './images/map.png';
import prof_pic from './images/profile_pic.png';
import {
  Card,
  Upload,
  Icon,
  message,
  Input,
  Modal,
  Button,
  Row,
  Col
} from 'antd';
import {addProfilePhoto} from '../../userApi';

const { TextArea } = Input;

function getBase64(img, callback) {  
  const reader = new FileReader();
  reader.addEventListener('load', () => {    
    callback(reader.result);
  });
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };
  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {      
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => this.setState({
        imageUrl,
        loading: false,
      }));
    }
  }
  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;    
    return (
      <Upload
        name="avatar"                
        customRequest = {addProfilePhoto}        
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action='/api/profile'              
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="" /> : uploadButton}
      </Upload>
    );
  }
}


class EditProfile extends React.Component {
  state = { visible: false }
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
          <Button icon="edit" className="edit-profile" onClick={this.showModal}>Edit Profile</Button>
        <Modal
          title="Edit Profile"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Avatar />
          <p>Write a brief description about yourself</p>
          <TextArea rows={4} />
        </Modal>
      </div>
    );
  }
}

const ProfilePic = () => (
  <Card
    style={{ width: 140 }}
    cover={<img src={prof_pic} />}
  />
)

const Bio = () => (
  <div className="bio">
    <p>
      Bio goes here!
    </p>
  </div>
)

const Map = () => (
  <Card
    cover={<img src={map} />}
  />
)

export const ProfilePage = () => (
  <Row gutter={16} >
    <Col span={16}>
      <div className='left'>
        <ProfilePic />
        <EditProfile />
        <Bio />
      </div>
    </Col>
    <Col span={8}>
      <Map />
    </Col>
  </Row>
);


// <div className='right'>
//   <Map />
// </div>
// <div className='prof-pic-container'>
//   <div className='prof-pic' >
//     <img src={prof_pic} />
//   </div>
// </div>


// <div className='map-container'>
//   <div className='map' >
//     <img src={map} />
//   </div>
// </div>
