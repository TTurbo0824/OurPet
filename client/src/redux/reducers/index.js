import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import user from './user';
import dogwalker from './dogwalker';

const persistConfig = {
  key: 'root',
  storage: storage
};

const rootReducer = combineReducers({
  user,
  dogwalker
});

export default persistReducer(persistConfig, rootReducer);
