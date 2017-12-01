import { combineReducers } from 'redux';
import albumReducer from './albumReducer';
import photoReducer from './photoReducer';

const rootReducer = combineReducers({
  albums: albumReducer,
  photos: photoReducer,
});

export default rootReducer;