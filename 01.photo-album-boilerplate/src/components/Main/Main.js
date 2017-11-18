import React, { Component } from 'react';
import { AlbumList } from '../Album';
import { Switch, Route } from 'react-router';
import * as api from '../../api';

class Main extends Component {
  state = {
    albums: {},
    photos: {},
  }

  componentWillMount() {
    this.setState({
      albums: api.getAlbums(),
      photos: api.getPhotos(),
    });
  }

  createAlbum = (album) => {
    let albums = { ...this.state.albums };
    const timestamp = Date.now();
    albums[`album-${timestamp}`] = album;
    this.setState({
      albums
    });
  }

  editAlbum = (key, updatedAlbum) => {
    let albums = { ...this.state.albums };
    albums[key] = updatedAlbum;
    this.setState({
      albums
    });
  }

  deleteAlbum = (key) => {
    let albums = { ...this.state.albums };
    delete albums[key];
    this.setState({
      albums
    });
  }

  render() {
    const { albums, photos } = this.state;
    const notFound = () => <h1>Component not found, sorry</h1>;

    const albumList = () => {
      return (
        <AlbumList
          albums={albums}
          photos={photos}
          deleteAlbum={this.deleteAlbum}
          editAlbum={this.editAlbum}
          createAlbum={this.createAlbum}
        />
      );
    }

    return (
      <Switch >
        <Route exact path="/" render={albumList} />
        <Route path="/albums" render={albumList} />
        <Route render={notFound} />
      </Switch>
    );
  }

}

export default Main;
