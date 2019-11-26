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
  console.log(strategy);
  return {
    exchange: 'BitMEX',
    link: `/strategies/bitmex/${strategy.symbol}`,
    pair: strategy.symbol,
    open: strategy.isOpen,
    commission: strategy.commission,
    break_even: `$${strategy.breakEvenPrice.toFixed(2)}`,
    leverage: strategy.leverage,
    satoshi: (strategy.currentQty / strategy.lastPrice).toFixed(8),
    quantity: `$${strategy.currentQty.toFixed(2)}`,
    last_price: `$${strategy.lastPrice.toFixed(2)}`,
    liquidation: `$${strategy.liquidationPrice.toFixed(2)}`,
    entry_price: `$${strategy.avgEntryPrice.toFixed(2)}`,
    unrealised_pnl: strategy.unrealisedPnl,
    realised_pnl: strategy.realisedPnl,
    uuid: uuid.v1(),
  };
}
