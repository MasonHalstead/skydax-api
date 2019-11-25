import uuid from 'uuid';

export function normalizeWithUUID(array) {
  return array.map(arr => ({
    ...arr,
    uuid: uuid.v1(),
  }));
}

export function normalizeBitmexStrategies(strategies) {
  return strategies.map(strategy => ({
    exchange: 'BitMex',
    link: `/strategies/bitmex/${strategy.symbol}`,
    pair: strategy.symbol,
    break_even: strategy.breakEvenPrice,
    position_price: strategy.currentQty * 0.00000001 * strategy.lastPrice,
    quantity: strategy.currentQty,
    last_price: strategy.lastPrice,
    liquidation: strategy.liquidationPrice,
    entry_price: strategy.avgEntryPrice,
    unrealised_pnl: strategy.unrealisedPnl,
    uuid: uuid.v1(),
  }));
}
