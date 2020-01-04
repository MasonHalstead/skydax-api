import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleApiError as handleApiErrorOperator } from 'ducks/operators/settings';
import { getStrategiesConfig as getStrategiesConfigOperator } from 'ducks/operators/strategies';
import { setLoading as setLoadingAction } from 'ducks/actions';
import { Table } from 'components/table/Table';
import uuid from 'uuid';
import { StrategyAccountBlock } from './StrategyAccountBlock';
import { StrategyEquityBlock } from './StrategyEquityBlock';
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
    getStrategiesConfig: PropTypes.func,
    setLoading: PropTypes.func,
  };

  state = {
    interval: 'm1',
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

  handleInterval = async interval => {
    await this.setState({ interval });
    this.handleInitialData();
  };

  handleInitialData = async () => {
    const { setLoading, getStrategiesConfig, handleApiError } = this.props;
    const { interval } = this.state;
    setLoading(true);
    try {
      await getStrategiesConfig({ interval });
    } catch (err) {
      handleApiError(err);
    }
    setLoading(false);
  };

  render() {
    const { headers, interval } = this.state;
    const { strategies } = this.props;
    return (
      <div className={cn.page}>
        <div className={cn.strategyBlock}>
          <StrategyAccountBlock />
          <StrategyEquityBlock handleInterval={this.handleInterval} interval={interval} />
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
  getStrategiesConfig: getStrategiesConfigOperator,
  handleApiError: handleApiErrorOperator,
};

export default connect(mapStateToProps, mapDispatchToProps)(StrategiesPage);
