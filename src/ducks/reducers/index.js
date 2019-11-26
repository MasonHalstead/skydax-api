import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { settingsReducer } from './settingsReducer';
import { walletReducer } from './walletReducer';
import { fundingReducer } from './fundingReducer';
import { strategiesReducer } from './strategiesReducer';
import { strategyReducer } from './strategyReducer';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  wallet: walletReducer,
  funding: fundingReducer,
  strategy: strategyReducer,
  strategies: strategiesReducer,
});

export default rootReducer;
