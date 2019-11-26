import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStrategies as getStrategiesOperator } from 'ducks/operators/strategies';
import { setLoading as setLoadingAction } from 'ducks/actions';
import { Table } from 'components/table/Table';
import uuid from 'uuid';
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
    getStrategies: PropTypes.func,
    setLoading: PropTypes.func,
  };

  state = {
    headers: [
      {
        title: 'Exchange',
        show: true,
        flex_grow: 1,
        min_width: '150px',
        uuid: uuid.v1(),
      },
      {
        title: 'Pair',
        show: true,
        min_width: '150px',
        uuid: uuid.v1(),
      },
      {
        title: 'Quantity',
        show: true,
        min_width: '150px',
        uuid: uuid.v1(),
      },
      {
        title: 'Leverage',
        show: true,
        min_width: '150px',
        uuid: uuid.v1(),
      },
      {
        title: 'Satoshi',
        show: true,
        min_width: '150px',
        uuid: uuid.v1(),
      },
      {
        title: 'Last Price',
        show: true,
        min_width: '150px',
        uuid: uuid.v1(),
      },
      {
        title: 'Entry Price',
        show: true,
        min_width: '150px',
        uuid: uuid.v1(),
      },
      {
        title: 'Break Even',
        show: true,
        min_width: '150px',
        uuid: uuid.v1(),
      },
      {
        title: 'Liquidation',
        show: true,
        min_width: '150px',
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
    const { setLoading, getStrategies } = this.props;
    setLoading(true);
    try {
      await getStrategies();
    } catch {
      console.log('Strategies Error');
    }
    setLoading(false);
  };

  render() {
    const { headers } = this.state;
    const { strategies } = this.props;
    return (
      <div className={cn.page}>
        <div className={cn.strategyBlock}>
          <div className={cn.panelLeft}>
            <p>Strategy Stats</p>
          </div>
          <div className={cn.panelRight}>
            <p>Strategy Stats</p>
          </div>
        </div>
        <div className={cn.strategyTable}>
          <Table
            rows={strategies}
            headers={headers}
            cell_components={[
              ExchangeCell,
              PairCell,
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
  getStrategies: getStrategiesOperator,
};

export default connect(mapStateToProps, mapDispatchToProps)(StrategiesPage);
