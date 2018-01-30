import React, { Component } from 'react';
import map from './images/map.png';
import prof_pic from './images/profile_pic.png';
import {addProfilePhoto, addBioText} from '../../userApi';
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

function getBase64(img, callback) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      resolve(reader.result);
    });
    reader.readAsDataURL(img);
  });
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
    console.log("Handle Change", info);
    if( info.file.status === 'done'){
      getBase64(info.file.originFileObj).then(imageUrl => {
        this.setState({
          imageUrl,
          loading: false
        });
        this.props.updateProfileState({ pic: imageUrl });
      });
    }    
    
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === 'error'){
      this.setState({ loading: false});
      return;
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
        {imageUrl ? <img src={imageUrl} className="upload-preview" alt="image preview" /> : uploadButton}
      </Upload>
    );
  }
}

class EditProfile extends React.Component {
  state = { visible: false, bioValue: "" }
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
    addBioText(this.state.bioValue);
    // callback to set state in Profile
    this.props.updateProfileState({
      bio: this.state.bioValue
    });
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  onBioChange = (e) => {
    this.setState({
      bioValue: e.target.value,
    });
  }
  render() {
    const { TextArea } = Input;
    return (
      <div>
        <Button icon="edit" className="edit-profile" onClick={this.showModal}>Edit Profile</Button>
        <Modal
          title="Edit Profile"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Avatar updateProfileState={this.props.updateProfileState} />
          <p>Write a brief description about yourself</p>
          <TextArea rows={4} onChange={this.onBioChange} value={this.state.bioValue}/>
        </Modal>
      </div>
    );
  }
}

const ProfilePic = ({ src }) => (
  <Card
    style={{ width: 140 }}
    cover={<img src={src} />}
  />
)

const Bio = ({ bio }) => (
  <div className="bio">
    <p>{bio}</p>
  </div>
)

const Map = () => (
  <Card
    cover={<img src={map} />}
  />
)

export class ProfilePage extends React.Component {
  state = {
    pic: prof_pic,
    bio: 'Bio Goes Here'
  }

  handleProfileChange = data => {
    this.setState(data)
  }

  render() {
    return (
      <Row gutter={16} >
        <Col span={16}>
          <div className='left'>
            <ProfilePic src={this.state.pic} />
            <EditProfile updateProfileState={this.handleProfileChange} />
            <Bio bio={this.state.bio} />
          </div>
        </Col>
        <Col span={8}>
          <Map />
        </Col>
      </Row>
    )
  }
}
