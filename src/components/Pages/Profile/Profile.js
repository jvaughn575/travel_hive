import React, { Component } from "react";
import dva, { connect } from "dva";
// import map from "../images/map.png";
// import prof_pic from "../images/profile_pic.png";
import {Card,Row,Col,Divider} from "antd";

/***************  Profile folder imports ****************/
import {Avatar} from "./Avatar";
import {EditProfile} from "./EditProfile";
import {BookmarkInspiration} from "./BookmarkInspiration";


const { Meta } = Card;

const ProfilePic = ({ src }) => (
  <Card cover={<img src={src} id="profile-avatar" />} />
);

const Bio = ({ bio }) => (
  <div className="bio">
    <p>{bio}</p>
  </div>
);

const Map = () => (
  <Card cover={ <img src={process.env.PUBLIC_URL + 'images/map.png'} alt="map" className="map" /> } />
);

export class ProfilePage extends React.Component {
  state = {
    pic: this.props.appState.user.profileImage,
    bio: this.props.appState.user.bioText
  };

  handleProfileChange = data => {
    this.setState(data);
  };

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={16}>
            <div className="left">
              <ProfilePic src={this.state.pic} />
              <EditProfile
                updateProfileState={this.handleProfileChange}
                appState={this.props.appState}
              />
              <Bio bio={this.state.bio} />
            </div>
          </Col>
          <Col span={8}>
            <Map />
          </Col>
        </Row>
        <Divider>My Inspirations</Divider>
        <Row type="flex" justify="space-around">
          <Col lg={{ span: 8, offset: 16 }}>
            <BookmarkInspiration appState={this.props.appState} />
          </Col>
        </Row>
        <Row type="flex" justify="start">
          <Col lg={{ span: 8 }}>
            {this.props.appState.inspiration.map(i => (
              <Card
                style={{ maxWidth: "60%" }}
                cover={<img src={i.image} alt="" />}
              >
                <Meta title={i.title} />
              </Card>
            ))}
          </Col>
        </Row>
      </div>
    );
  }
}
