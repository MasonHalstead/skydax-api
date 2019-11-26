import { getWallet } from 'ducks/operators/wallet';
import { handleApiError } from 'ducks/operators/settings';
import { getStrategy } from 'ducks/operators/strategy';
import { getFunding } from 'ducks/operators/funding';

export const getBitmexStrategy = pair => async dispatch => {
  try {
    const strategy = await dispatch(getStrategy(pair));
    await Promise.all([
      dispatch(getWallet(strategy)),
      dispatch(getFunding(pair)),
    ]);
  } catch (err) {
    dispatch(handleApiError(err, pair));
  }
};
