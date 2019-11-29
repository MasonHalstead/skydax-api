import {
  SET_BITMEX_CANDLES,
  CLEAR_BITMEX_CANDLES,
  SET_BITMEX_EQUITY,
  CLEAR_BITMEX_EQUITY,
  SET_KRAKEN_CANDLES,
  CLEAR_KRAKEN_CANDLES,
} from 'ducks/types';

const initialState = {
  bitmex_candles: [],
  bitmex_equity: [],
  kraken_candles: [],
};

export const chartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BITMEX_CANDLES:
      return { ...state, bitmex_candles: action.payload };
    case CLEAR_BITMEX_CANDLES:
      return { ...state, bitmex_candles: [] };
    case SET_BITMEX_EQUITY:
      return { ...state, bitmex_equity: action.payload };
    case CLEAR_BITMEX_EQUITY:
      return { ...state, bitmex_equity: [] };
    case SET_KRAKEN_CANDLES:
      return { ...state, kraken_candles: action.payload };
    case CLEAR_KRAKEN_CANDLES:
      return { ...state, kraken_candles: [] };
    default:
      return state;
  }
};
