import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image, Button } from 'semantic-ui-react';

const Photo = (props) => {
  const { title, description, url } = props;

  return (
    <Card className="photo">
      <Card.Content>
        <Image src={url} />
        <Card.Header>
          {title}
        </Card.Header>
        <Card.Meta>
          {description}
        </Card.Meta>
      </Card.Content>
      <Button.Group basic attached="bottom">
        {props.children}
      </Button.Group>
    </Card>
  );
}

Photo.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default Photo;