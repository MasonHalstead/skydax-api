import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { settingsReducer } from './settingsReducer';
import { strategiesReducer } from './strategiesReducer';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  strategies: strategiesReducer,
});

export default rootReducer;
