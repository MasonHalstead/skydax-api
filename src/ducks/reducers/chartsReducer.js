import {
  SET_BITMEX_CANDLES,
  CLEAR_BITMEX_CANDLES,
  SET_KRAKEN_CANDLES,
  CLEAR_KRAKEN_CANDLES,
} from 'ducks/types';

const initialState = {
  bitmex_candles: [],
  kraken_candles: [],
};

export const chartsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BITMEX_CANDLES:
      return { ...state, bitmex_candles: action.payload };
    case CLEAR_BITMEX_CANDLES:
      return { ...state, bitmex_candles: [] };
    case SET_KRAKEN_CANDLES:
      return { ...state, kraken_candles: action.payload };
    case CLEAR_KRAKEN_CANDLES:
      return { ...state, kraken_candles: [] };
    default:
      return state;
  }
};
