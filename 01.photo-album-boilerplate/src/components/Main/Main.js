import React from 'react';
import { Switch, Route } from 'react-router';
import { AlbumList } from '../Album';
import Photo from '../Photo';
import Login from '../Login';
import * as api from '../../api';

class Main extends React.Component {
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

  deleteAlbum = (key) => {
    let albums = { ...this.state.albums };
    delete albums[key];
    this.setState({
      albums,
    });
  }

  updateAlbum = (key, updatedAlbum) => {
    let albums = { ...this.state.albums };
    albums[key] =  updatedAlbum;
    this.setState({
      albums,
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

  render() {
    const { albums, photos } = this.state;

    const notFound = () => {
      return 'Sorry, not found...';
    }

    const albumList = () => {
      return (
        <AlbumList
          albums={albums}
          photos={photos}
          deleteAlbum={this.deleteAlbum}
          updateAlbum={this.updateAlbum}
          createAlbum={this.createAlbum}
        />
      );
    }
    
    return (
      <Switch>
        <Route exact path="/" render={albumList} />
        <Route path="/albums" render={albumList} />
        <Route path="/photos" component={Photo} />
        <Route path="/login" component={Login} />
        <Route render={notFound} />
      </Switch>
    );
  }
}

export default Main;