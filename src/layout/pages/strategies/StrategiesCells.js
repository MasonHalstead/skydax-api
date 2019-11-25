import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import cn from './StrategiesPage.module.scss';

export const ExchangeCell = ({ row }) => (
  <div className={cn.cell}>
    <p className={cn.overflow}>{row.exchange}</p>
  </div>
);
ExchangeCell.propTypes = {
  row: PropTypes.object,
};

export const PairCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <p className={cn.overflow}>{row.pair}</p>
  </div>
);
PairCell.propTypes = {
  row: PropTypes.object,
};

export const QuantityCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <p className={cn.overflow}>{row.quantity}</p>
  </div>
);
QuantityCell.propTypes = {
  row: PropTypes.object,
};

export const PositionCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <p className={cn.overflow}>{`$${row.position_price.toFixed(2)}`}</p>
  </div>
);
PositionCell.propTypes = {
  row: PropTypes.object,
};

export const LastPriceCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <p className={cn.overflow}>{row.last_price}</p>
  </div>
);
LastPriceCell.propTypes = {
  row: PropTypes.object,
};

export const EntryPriceCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <p className={cn.overflow}>{row.entry_price}</p>
  </div>
);
EntryPriceCell.propTypes = {
  row: PropTypes.object,
};

export const BreakEvenCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <p className={cn.overflow}>{row.break_even}</p>
  </div>
);
BreakEvenCell.propTypes = {
  row: PropTypes.object,
};

export const UnrealisedPnlCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <p className={cn.overflow}>{row.unrealised_pnl}</p>
  </div>
);
UnrealisedPnlCell.propTypes = {
  row: PropTypes.object,
};

export const LiquidationCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <p className={cn.overflow}>{row.liquidation}</p>
  </div>
);
LiquidationCell.propTypes = {
  row: PropTypes.object,
};
