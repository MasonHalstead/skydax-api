import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getBitmexCandles as getBitmexCandlesOperator,
  getKrakenCandles as getKrakenCandlesOperator,
} from 'ducks/operators/charts';
import { handleApiError as handleApiErrorOperator } from 'ducks/operators/settings';
import { getStrategies as getStrategiesOperator } from 'ducks/operators/strategies';
import { setLoading as setLoadingAction } from 'ducks/actions';
import { Table } from 'components/table/Table';
import uuid from 'uuid';
import moment from 'moment';
import { StrategyBitmexBlock } from './StrategyBitmexBlock';
import { StrategyKrakenBlock } from './StrategyKrakenBlock';
import {
  ExchangeCell,
  PairCell,
  QuantityCell,
  SatoshiCell,
  LastPriceCell,
  EntryPriceCell,
  BreakEvenCell,
  LeverageCell,
  LiquidationCell,
  ActionCell,
} from './StrategiesCells';
import cn from './StrategiesPage.module.scss';

export class StrategiesPage extends Component {
  static propTypes = {
    strategies: PropTypes.array,
    handleApiError: PropTypes.func,
    getStrategies: PropTypes.func,
    getKrakenCandles: PropTypes.func,
    getBitmexCandles: PropTypes.func,
    setLoading: PropTypes.func,
  };

  state = {
    headers: [
      {
        title: 'Pair',
        show: true,
        min_width: '125px',
        flex_grow: 1,
        uuid: uuid.v1(),
      },
      {
        title: 'Exchange',
        show: true,
        min_width: '125px',
        uuid: uuid.v1(),
      },
      {
        title: 'Quantity',
        show: true,
        min_width: '125px',
        uuid: uuid.v1(),
      },
      {
        title: 'Leverage',
        show: true,
        min_width: '125px',
        uuid: uuid.v1(),
      },
      {
        title: 'Satoshi',
        show: true,
        min_width: '125px',
        uuid: uuid.v1(),
      },
      {
        title: 'Last Price',
        show: true,
        min_width: '125px',
        uuid: uuid.v1(),
      },
      {
        title: 'Entry Price',
        show: true,
        min_width: '125px',
        uuid: uuid.v1(),
      },
      {
        title: 'Break Even',
        show: true,
        min_width: '125px',
        uuid: uuid.v1(),
      },
      {
        title: 'Liquidation',
        show: true,
        min_width: '125px',
        uuid: uuid.v1(),
      },
      {
        title: '',
        show: true,
        min_width: '40px',
        uuid: uuid.v1(),
      },
    ],
  };

  componentDidMount = () => {
    this.handleInitialData();
  };

  handleInitialData = async () => {
    const {
      setLoading,
      getStrategies,
      getBitmexCandles,
      getKrakenCandles,
      handleApiError,
    } = this.props;
    const start_date = moment
      .utc()
      .startOf('day')
      .format();
    const end_date = moment.utc().format();

    setLoading(true);
    try {
      await getStrategies();
      await getBitmexCandles({
        start_date,
        end_date,
        pair: 'XBTUSD',
      });
      await getKrakenCandles({
        start_date,
        end_date,
        pair: 'XXBTZUSD',
      });
    } catch (err) {
      handleApiError(err);
    }
    setLoading(false);
  };

  render() {
    const { headers } = this.state;
    const { strategies } = this.props;
    return (
      <div className={cn.page}>
        <div className={cn.strategyBlock}>
          <StrategyBitmexBlock />
          <StrategyKrakenBlock />
        </div>
        <div className={cn.strategyTable}>
          <Table
            rows={strategies}
            headers={headers}
            cell_components={[
              PairCell,
              ExchangeCell,
              QuantityCell,
              LeverageCell,
              SatoshiCell,
              LastPriceCell,
              EntryPriceCell,
              BreakEvenCell,
              LiquidationCell,
              ActionCell,
            ]}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  strategies: state.strategies,
});

const mapDispatchToProps = {
  setLoading: setLoadingAction,
  getKrakenCandles: getKrakenCandlesOperator,
  getBitmexCandles: getBitmexCandlesOperator,
  handleApiError: handleApiErrorOperator,
  getStrategies: getStrategiesOperator,
};

export default connect(mapStateToProps, mapDispatchToProps)(StrategiesPage);
