import uuid from 'uuid';

export function normalizeWithUUID(array) {
  return array.map(arr => ({
    ...arr,
    uuid: uuid.v1(),
  }));
}

export function normalizeBitmexStrategies(strategies) {
  return strategies.map(strategy => normalizeBitmexStrategy(strategy));
}

export function normalizeBitmexStrategy(strategy) {
  return {
    exchange: 'BitMEX',
    link: `/strategies/bitmex/${strategy.symbol}`,
    pair: strategy.symbol,
    open: strategy.isOpen,
    break_even: `$${strategy.breakEvenPrice.toFixed(2)}`,
    satoshi: (strategy.currentQty / strategy.lastPrice).toFixed(8),
    quantity: `$${strategy.currentQty.toFixed(2)}`,
    last_price: `$${strategy.lastPrice.toFixed(2)}`,
    liquidation: `$${strategy.liquidationPrice.toFixed(2)}`,
    entry_price: `$${strategy.avgEntryPrice.toFixed(2)}`,
    unrealised_pnl: `$${strategy.unrealisedPnl.toFixed(2)}`,
    realised_pnl: `$${strategy.realisedPnl.toFixed(2)}`,
    uuid: uuid.v1(),
  };
}
