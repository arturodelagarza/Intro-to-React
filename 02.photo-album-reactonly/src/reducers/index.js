import { combineReducers } from 'redux';
import albumReducers from './albumReducers';
import photoReducers from './photoReducers';

const rootReducer = combineReducers(
  {
    albums: albumReducers,
    photos: photoReducers,
  }
);

export default rootReducer;