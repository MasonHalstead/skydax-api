import { setWallet } from 'ducks/actions';
import { getData } from 'utils/axios';

export const getWallet = strategy => async dispatch => {
  const satoshi_conversion = 0.00000001;
  const { lastPrice } = strategy;
  const res = await getData(`/bitmex/wallet`);
  const {
    walletBalance,
    marginBalance,
    availableMargin,
    marginLeverage,
  } = res.data;
  await dispatch(
    setWallet({
      balance: `$${(walletBalance * satoshi_conversion * lastPrice).toFixed(
        2,
      )}`,
      satoshi_balance: (walletBalance * satoshi_conversion).toFixed(8),
      margin_balance: `$${(
        marginBalance *
        satoshi_conversion *
        lastPrice
      ).toFixed(2)}`,
      satoshi_margin_balance: (marginBalance * satoshi_conversion).toFixed(8),
      satoshi_avail_margin_balance: (
        availableMargin * satoshi_conversion
      ).toFixed(8),
      leverage: marginLeverage.toFixed(4),
    }),
  );
  return res.data;
};
