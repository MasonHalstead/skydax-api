import { setStrategies } from 'ducks/actions';
import { getWallet } from 'ducks/operators/wallet';
import { handleApiError } from 'ducks/operators/settings';
import { getCandle } from 'ducks/operators/candle';
import { getBitmexCandles, getBitmexEquity } from 'ducks/operators/charts';
import { getFunding } from 'ducks/operators/funding';
import { normalizeBitmexStrategies } from 'utils/normalizers';
import { getData } from 'utils/axios';
import moment from 'moment';

export const getStrategiesConfig = (pair = 'XBTUSD') => async dispatch => {
  const start_date = moment
    .utc()
    .subtract(3, 'days')
    .format();
  const end_state = moment.utc().format();
  try {
    const candle = await dispatch(getCandle({ pair }));
    await Promise.all([
      dispatch(
        getBitmexCandles({
          start_date,
          end_state,
          pair,
        }),
      ),
      dispatch(
        getBitmexEquity({
          start_date,
          end_state,
          pair,
        }),
      ),
      dispatch(getStrategies()),
      dispatch(getWallet(candle)),
      dispatch(getFunding(pair)),
    ]);
  } catch (err) {
    dispatch(handleApiError(err, pair));
  }
};
export const getStrategies = () => async dispatch => {
  const res = await getData(`/bitmex/positions`);
  await dispatch(setStrategies(normalizeBitmexStrategies(res.data)));
  return res.data;
};
