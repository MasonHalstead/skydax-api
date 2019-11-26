import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import cn from './StrategiesPage.module.scss';

export const ExchangeCell = ({ row }) => (
  <div className={cn.cell}>
    <Link to={row.link} className={cn.exchangeCell}>
      {row.exchange}
    </Link>
  </div>
);
ExchangeCell.propTypes = {
  row: PropTypes.object,
};

export const PairCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <Link to={row.link} className={cn.strategyCell}>
      {row.pair}
    </Link>
  </div>
);
PairCell.propTypes = {
  row: PropTypes.object,
};

export const QuantityCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <Link to={row.link} className={cn.strategyCell}>
      {row.quantity}
    </Link>
  </div>
);
QuantityCell.propTypes = {
  row: PropTypes.object,
};

export const SatoshiCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <Link to={row.link} className={cn.strategyCell}>
      {row.satoshi}
    </Link>
  </div>
);
SatoshiCell.propTypes = {
  row: PropTypes.object,
};

export const LastPriceCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <Link to={row.link} className={cn.strategyCell}>
      {row.last_price}
    </Link>
  </div>
);
LastPriceCell.propTypes = {
  row: PropTypes.object,
};

export const EntryPriceCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <Link to={row.link} className={cn.strategyCell}>
      {row.entry_price}
    </Link>
  </div>
);
EntryPriceCell.propTypes = {
  row: PropTypes.object,
};

export const BreakEvenCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <Link to={row.link} className={cn.strategyCell}>
      {row.break_even}
    </Link>
  </div>
);
BreakEvenCell.propTypes = {
  row: PropTypes.object,
};

export const UnrealisedPnlCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <Link to={row.link} className={cn.strategyCell}>
      {row.unrealised_pnl}
    </Link>
  </div>
);
UnrealisedPnlCell.propTypes = {
  row: PropTypes.object,
};

export const LiquidationCell = ({ row }) => (
  <div className={classNames(cn.cell, cn.center)}>
    <Link to={row.link} className={cn.strategyCell}>
      {row.liquidation}
    </Link>
  </div>
);
LiquidationCell.propTypes = {
  row: PropTypes.object,
};
