/******************* BookmarkInspiration Component of Profile Page *******************/
import React from 'react';
import {Button,message,Modal} from 'antd';
import {PinCard, PinInput} from './PinCard';
import {addInspiration,getBase64ImgFromUrl} from '../../../userApi';

const ImageSelector = ({ imageAttrs, selectImage }) => (
    <div>
      <h1>Select An Image</h1>
      {imageAttrs.map((imageAttrs, index) => (
        <img
          key={index}
          onClick={selectImage.bind(this, imageAttrs.src)}
          src={imageAttrs.src}
          alt={imageAttrs.alt}
          style={{ maxWidth: "100px" }}
        />
      ))}
    </div>
  );

export class BookmarkInspiration extends React.Component {
    state = {
      loading: false,
      visible: false,
      imageChosen: false,
      selectedImageAttrs: null,
      imageAttrs: [],
      title: ""
    };
    showModal = () => {
      this.setState({
        visible: true
      });
    };
    handleOk = () => {
      this.props.appState.dispatch({
        type: "inspiration/addInspiration",
        payload: {
          title: this.state.title,
          image: this.state.selectedImageAttrs.src
        }
      }),
        addInspiration({
          image: this.state.selectedImageAttrs.src,
          description: "Test run"
        }).then(response => {
          if (response) {
            message.success("Inspiration added!");
          } else {
            message.error("Inspiration was not saved!");
          }
        });
      this.setState({
        loading: true,
        imageChosen: false,
        selectedImageAttrs: null,
        title: ""
      });
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
      }, 3000);
    };
    handleCancel = () => {
      this.setState({ visible: false });
    };
    handleTitleChange = e => this.setState({ title: e.target.value });
    selectImage = (src, e) => {
      getBase64ImgFromUrl(src).then(result => {
        this.setState({ selectedImageAttrs: { src: result } });
        this.setState({ imageChosen: true });
      });
    };
  
    updateImages = imageAttrs => {
      this.setState({ imageAttrs: imageAttrs, loading: false });
    };
  
    render() {
      const { visible, loading } = this.state;
  
      return (
        <div>
          <Button icon="plus" onClick={this.showModal}>
            Bookmark Your Inspiration
          </Button>
          <Modal
            style={{ top: 20 }}
            visible={visible}
            title="Bookmark Your Inspiration"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button
                key="submit"
                icon="plus"
                loading={loading}
                onClick={this.handleOk}
              >
                Add
              </Button>
            ]}
          >
            <PinInput updateImages={this.updateImages} />
  
            {this.state.imageChosen ? (
              <PinCard
                selectedImageAttrs={this.state.selectedImageAttrs}
                handleChange={this.handleTitleChange}
                title={this.state.title}
              />
            ) : (
              <ImageSelector
                selectImage={this.selectImage}
                imageAttrs={this.state.imageAttrs}
              />
            )}
          </Modal>
        </div>
      );
    }
  }