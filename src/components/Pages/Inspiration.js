import React, { Component } from 'react';
import { Form, Input, Card, Button } from 'antd';

const { Meta } = Card;

class PinInput extends Component {
  constructor(props) {
    super(props);

    this.state = { url: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // console.log(event.target.value);
    this.setState({ url: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('New Pin URL: ' + this.state.url);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          placeholder="Enter Url"
          value={this.state.url}
          onChange={this.handleChange}
          style={{ width: 400 }}
        />
        <Button htmlType="submit" icon="pushpin-o">Pin</Button>

      </Form>
    );
  }
}

const PinCard = () => (
  <div>
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img src="https://assets.atlasobscura.com/media/W1siZiIsInVwbG9hZHMvcGxhY2VfaW1hZ2VzL2RlODZjMTUyZWY2YWRlZmYxNDljNWIxNzU2NjNmYThhNzI4NTVhNzMuanBnIl0sWyJwIiwidGh1bWIiLCI5ODB4PiJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA4MSAtYXV0by1vcmllbnQiXV0/de86c152ef6adeff149c5b175663fa8a72855a73.jpg" alt="" />}
    >
      <Meta
        title="Kasbah du Toubkal"
        description={<a href="https://www.atlasobscura.com/places/kasbah-du-toubkal" rel="noopener noreferrer" target="_blank">Source</a>}
      />
    </Card>
  </div>
);


export const InspirationPage = () => (
  <div>
    <PinInput />
    <PinCard />
  </div>
);
