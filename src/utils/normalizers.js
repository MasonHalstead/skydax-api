import uuid from 'uuid';
import moment from 'moment';

export function normalizeWithUUID(array) {
  return array.map(arr => ({
    ...arr,
    uuid: uuid.v1(),
  }));
}

export function normalizeCandles(candles) {
  return candles.reduce(
    (acc, next) => ({
      dates: [
        ...acc.dates,
        moment(next.date_time)
          .utc()
          .format('MM/DD HH:mm'),
      ],
      data: [...acc.data, next.close],
    }),
    {
      dates: [],
      data: [],
    },
  );
}

export function normalizeBitmexStrategies(strategies) {
  return strategies.map(strategy => normalizeBitmexStrategy(strategy));
}

export function normalizeBitmexStrategy(strategy) {
  const {
    currentQty,
    lastPrice,
    breakEvenPrice,
    liquidationPrice,
    avgEntryPrice,
  } = strategy;

  let satoshi = null;
  let break_even = null;
  let last_price = null;
  let liquidation = null;
  let entry_price = null;
  let quantity = null;

  if (currentQty && lastPrice) {
    satoshi = (currentQty / lastPrice).toFixed(8);
  }
  if (breakEvenPrice) {
    break_even = `$${(strategy.breakEvenPrice || 0).toFixed(2)}`;
  }
  if (lastPrice) {
    last_price = `$${strategy.lastPrice.toFixed(2)}`;
  }
  if (liquidationPrice) {
    liquidation = `$${strategy.liquidationPrice.toFixed(2)}`;
  }
  if (avgEntryPrice) {
    entry_price = `$${strategy.avgEntryPrice.toFixed(2)}`;
  }
  if (currentQty) {
    quantity = `$${strategy.currentQty.toFixed(2)}`;
  }
  return {
    exchange: 'BitMEX',
    link: `/strategies/bitmex/${strategy.symbol}`,
    pair: strategy.symbol,
    open: strategy.isOpen,
    commission: strategy.commission,
    break_even,
    leverage: strategy.leverage,
    satoshi,
    quantity,
    last_price,
    liquidation,
    entry_price,
    unrealised_pnl: strategy.unrealisedPnl,
    realised_pnl: strategy.realisedPnl,
    uuid: uuid.v1(),
  };
}
