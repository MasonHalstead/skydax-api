import { setBitmexCandles, setKrakenCandles } from 'ducks/actions';
import { postData } from 'utils/axios';

export const getBitmexCandles = ({
  start_date,
  end_date,
  interval = 'm1',
  pair,
}) => async dispatch => {
  const data = {
    start_date,
    end_date,
  };
  const res = await postData(`/candles/bitmex/${pair}/${interval}`, data);
  await dispatch(setBitmexCandles(res.data));
  return res.data;
};

export const getKrakenCandles = ({
  start_date,
  end_date,
  interval = 'm1',
  pair,
}) => async dispatch => {
  const data = {
    start_date,
    end_date,
  };
  const res = await postData(`/candles/kraken/${pair}/${interval}`, data);
  await dispatch(setKrakenCandles(res.data));
  return res.data;
};
