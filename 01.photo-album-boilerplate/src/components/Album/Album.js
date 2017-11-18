import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Image, Label, Button } from 'semantic-ui-react';

const Album = (props) => {
  // Deconstructing ES6
  const { album, albumPhotos } = props;

  const renderPreviewImages = () => {
    return (
      albumPhotos
      .map((photo, index) => {
        return <Image key={index} src={photo.url} />;
      })
    );
  }

  const renderTags = () => {
    return (
      album.tags
      .map((tagName, index) => {
        return <Label key={index}>{tagName}</Label>;
      })  
    );
  }

  return (
    <Card>
      <Card.Content className="header" >
        <Card.Header>
          {album.name}
        </Card.Header>
        <Label attached="top right">
          <Icon name="photo" />
          {albumPhotos.length}
        </Label>
      </Card.Content>
      <Card.Content>
        <Image.Group size="tiny">
          {renderPreviewImages()}
        </Image.Group>
      </Card.Content>
      <Card.Content>
        <Card.Description as="p">
          {album.description}
        </Card.Description>
        <Card.Meta>
          <Label.Group tag size="mini">
            {renderTags()}
          </Label.Group>
        </Card.Meta>
      </Card.Content>
      <Button.Group basic attached="bottom">
        {props.children}
      </Button.Group>
    </Card>
  );
}

Album.propTypes = {
  album: PropTypes.object.isRequired,
  albumPhotos: PropTypes.array.isRequired,
}

export default Album;
