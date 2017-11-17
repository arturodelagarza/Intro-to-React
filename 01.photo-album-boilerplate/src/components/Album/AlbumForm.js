import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Button, Icon, Message } from 'semantic-ui-react';

class AlbumForm extends React.Component {
  state = {
    isError: false,
    isModalOpen: false,
    album: {
      name: '',
      description: '',
      tags: [],
      photosIds: [],
    }
  }

  static propTypes = {
    formType: PropTypes.oneOf(['New', 'Edit']).isRequired,
    photos: PropTypes.object.isRequired,
    album: PropTypes.object,
    objectKey: PropTypes.string,
    updateAlbum: PropTypes.func,
    createAlbum: PropTypes.func,
  }

  openModal = () => {
    const { album } = this.props;
    this.setState({ 
      isModalOpen: true,
      album,
    });
  }

  closeModal = () => this.setState({isModalOpen: false});
  isNewForm = () => this.props.formType === 'New';

  handleInputChange = (name, value) => {
    const { album } = this.state;
    const updatedAlbum = {
      ...album,
      [name]: value,
    }

    this.setState({ album: updatedAlbum });
  }

  isFormValid = () => {
    const { album } = this.state;

    if (!album) return false;
    else if (!album.name) return false;
    else if (!album.description) return false;
    else if (album.tags.length === 0) return false;
    else if (album.photosIds.length === 0) return false;
    
    return true;
  }

  handleSubmit = (event) => {
    const isFormValid = this.isFormValid();
    if(!isFormValid) {
      this.setState({ isError: true });
      return;
    } 

    this.setState({ isError: false });

    const { updateAlbum, createAlbum, objectKey } = this.props;
    const { album } = this.state;

    if(this.isNewForm()) {
      createAlbum(album);
    } else {
      updateAlbum(objectKey, album);
    }

    this.closeModal();
  }

  render() {
    const { isModalOpen, album, isError } = this.state;
    const { photos } = this.props;

    const dropDownOptions = 
      Object.keys(photos)
      .map(key => {
        const photo = photos[key];
        return {
          text: photo.title,
          value: key,
          image: {
            avatar: true, 
            src: photo.url
          }
        }
      });

    const buttonTrigger = 
      <Button icon onClick={this.openModal} >
        <Icon name={this.isNewForm() ? 'plus' : 'edit'} />
      </Button>;

    return (
      <Modal
        trigger={buttonTrigger}
        closeIcon
        open={isModalOpen}
        onClose={this.closeModal}
      >
        <Modal.Header>
          { 
            this.isNewForm() ? 'Create Album' : `Edit: ${album.name}`
          }
        </Modal.Header>
        <Modal.Content>
          <Form error={isError}>
            <Message
              error
              content="All fields are required"
            />
            <Form.Input
              name="name"
              label="Name"
              placeholder="Album name"
              defaultValue={this.isNewForm() ? "" : album.name}
              onChange={(e) => this.handleInputChange(e.target.name, e.target.value)}
              required
            />
            <Form.TextArea
              name="description"
              label="Description"
              placeholder="Tell me more about the album"
              defaultValue={this.isNewForm() ? "" : album.description}
              onChange={(e) => this.handleInputChange(e.target.name, e.target.value)}
              required
            />
            <Form.Input
              name="tags"
              label="Tags"
              placeholder="Enter tags separated by '|' pipe"
              defaultValue={this.isNewForm() ? "" : album.tags.join('|')}
              onChange={(e) => this.handleInputChange(e.target.name, e.target.value.split('|'))}
              required
              icon="tags"
              iconPosition="left"
            />
            <Form.Dropdown
              name="photosIds"
              label="Photos"
              placeholder="Select photos for this album"
              defaultValue={this.isNewForm() ? "" : album.photosIds}
              onChange={(e, data) => this.handleInputChange(data.name, data.value)}
              required
              fluid
              multiple
              selection
              options={dropDownOptions}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button 
            positive 
            icon="save" 
            content="Save"
            onClick={(e) => {this.handleSubmit(e)}}
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

export default AlbumForm;