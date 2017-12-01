import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import { AlbumList } from '../Album';
import { PhotoList } from '../Photo';
import Login from '../Login';
import { Message } from 'semantic-ui-react'

class Main extends Component {
  render() {
    const error = () => <Message
                    icon="warning circle"
                    header="Ups... Error!"
                    content="Please go back and try again."
                  />;
    return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/albums" component={AlbumList} />
        <Route path="/photos" component={PhotoList} />
        <Route path="/login" component={Login} />
        <Route render={error} />
      </Switch>
    );
  }
}

export default Main;