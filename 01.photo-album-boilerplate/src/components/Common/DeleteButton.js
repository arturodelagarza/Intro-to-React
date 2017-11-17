import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Confirm } from 'semantic-ui-react';

class DeleteButton extends React.Component {
  state = {
    confirmOpened: false,
  }

  static propTypes = {
    objectKey: PropTypes.string.isRequired,
    objectName: PropTypes.string.isRequired,
    deleteObject: PropTypes.func.isRequired,
  }

  openConfirm = () => {
    this.setState({
      confirmOpened: true,
    });
  }

  onCancelConfirm = () => {
    this.setState({
      confirmOpened: false,
    });
  }

  onOkConfirm = (objectKey) => {
    this.props.deleteObject(objectKey);
  }

  render() {
    const { objectKey, objectName } = this.props;
    const { confirmOpened } = this.state;

    return (
      <Button icon onClick={() => this.openConfirm()} >
        <Icon name="trash" />
        { confirmOpened && 
          <Confirm
            open={confirmOpened}
            content={`Are you sure you wan to delete '${objectName}?'`}
            cancelButton="No way!"
            confirmButton="Yeap!"
            onCancel={() => this.onCancelConfirm()}
            onConfirm={() => this.onOkConfirm(objectKey)}
          />
        }
      </Button>
    );
  }
}

export default DeleteButton;