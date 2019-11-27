import { setCandle } from 'ducks/actions';
import { postData } from 'utils/axios';
import moment from 'moment';

export const getCandle = ({ exchange, interval, pair }) => async dispatch => {
  const data = {
    start_date: moment
      .utc()
      .startOf('minute')
      .subtract(1, 'minute')
      .format(),
  };
  const res = await postData(`/candles/${exchange}/${pair}/${interval}`, data);
  await dispatch(setCandle(res.data[0]));
  return res.data[0];
};
