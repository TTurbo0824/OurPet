import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from './user';
import dogwalker from './dogwalker';
import rating from './rating';

const persistConfig = {
  key: 'root',
  storage: storage
};

const rootReducer = combineReducers({
  user,
  dogwalker,
  rating
});

export default persistReducer(persistConfig, rootReducer);
