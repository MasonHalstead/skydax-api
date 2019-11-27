import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { settingsReducer } from './settingsReducer';
import { walletReducer } from './walletReducer';
import { fundingReducer } from './fundingReducer';
import { modalsReducer } from './modalsReducer';
import { candleReducer } from './candleReducer';
import { strategiesReducer } from './strategiesReducer';
import { strategyReducer } from './strategyReducer';

const rootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  candle: candleReducer,
  wallet: walletReducer,
  modals: modalsReducer,
  funding: fundingReducer,
  strategy: strategyReducer,
  strategies: strategiesReducer,
});

export default rootReducer;
