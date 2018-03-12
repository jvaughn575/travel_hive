/******************* PinCard Component of Profile Page *******************/
import React,{Component} from 'react';
import {getPictures} from '../../../userApi';
import {Card,Form,Input,Spin} from 'antd';

export class PinInput extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        url: "",
        // title: '',
        loading: false
      };
  
      this.handleUrlChange = this.handleUrlChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }   
  
    handleUrlChange(event) {
      this.setState({
        url: event.target.value,
        loading: true
      });
      getPictures(event.target.value).then(imageAttrs => {
        this.props.updateImages(imageAttrs);
        this.setState({ loading: false });
      });
    }
  
    handleSubmit(event) {
      event.preventDefault();
    }
  
    render() {
      return (
        <Form className="bookmark-inspiration" onSubmit={this.handleSubmit}>
          <Input
            placeholder="Paste URL"
            value={this.state.url}
            onChange={this.handleUrlChange}
            style={{ maxWidth: "80%" }}
          />
          <Spin spinning={this.state.loading} />
        </Form>
      );
    }
  }

  export const PinCard = ({ selectedImageAttrs, handleChange, title }) => (
    <div className="pin-preview">
      <Card
        style={{ maxWidth: "60%" }}
        cover={<img src={selectedImageAttrs.src} alt="" />}
      >
        <Input
          type="text"
          value={title}
          onChange={handleChange}
          placeholder="Add Title..."
        />
      </Card>
    </div>
  );