import { setStrategies } from 'ducks/actions';
import { normalizeBitmexStrategies } from 'utils/normalizers';
import { getData } from 'utils/axios';

export const getStrategies = () => async dispatch => {
  const res = await getData(`/bitmex/positions`);
  await dispatch(setStrategies(normalizeBitmexStrategies(res.data)));
  return res.data;
};
