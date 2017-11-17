import React from 'react';
import Lightbox from 'react-images';

const addLightbox = (WrappedComponent) => {
  return class AddLightbox extends React.Component {
    state = {
      lightboxOpened: false,
      currentImageIndex: 0,
    }

    handlePlay = () => {
      this.setState({ 
        lightboxOpened: true 
      });
    }
    
    onLightboxClose = () => {
      this.setState({ 
        lightboxOpened: false, 
        currentImageIndex: 0 
      });
    }

    gotoNextImage = () => { 
      this.setState({
        currentImageIndex: this.state.currentImageIndex + 1,
      });
    }

    gotoPreviousImage = () => {
      this.setState({
        currentImageIndex: this.state.currentImageIndex - 1,
      });
    }

    render() {
      const { lightboxOpened, currentImageIndex } = this.state;
      const { photos } = this.props;
      const lightboxPhotos = photos
      .filter(photo => photo)
      .map(photo => {
        return {
          src: photo.url,
          caption: photo.title,
        }
      });

      return (
        <div onClick={() => this.handlePlay()} >
          <WrappedComponent 
            {...this.props} 
          />
          <Lightbox
            backdropClosesModal
            images={lightboxPhotos}
            isOpen={lightboxOpened}
            onClose={() => this.onLightboxClose()}
            onClickPrev={() => this.gotoPreviousImage()}
            onClickNext={() => this.gotoNextImage()}
            currentImage={currentImageIndex}
            onClickImage={() => {}}
          />
        </div>
      );
    }
  }
};

export default addLightbox;