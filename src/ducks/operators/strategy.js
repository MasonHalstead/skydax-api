import { setStrategy } from 'ducks/actions';
import { getCandle } from 'ducks/operators/candle';
import { normalizeBitmexStrategy } from 'utils/normalizers';
import { getData } from 'utils/axios';

export const getStrategy = pair => async dispatch => {
  const res = await getData(`/bitmex/positions/${pair}`);
  const candles = await dispatch(
    getCandle({
      exchange: 'bitmex',
      interval: 'm1',
      pair,
    }),
  );
  await dispatch(setStrategy(normalizeBitmexStrategy(res.data, candles)));
  return res.data;
};
