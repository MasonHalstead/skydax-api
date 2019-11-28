import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getKrakenCandles as getKrakenCandlesOperator } from 'ducks/operators/charts';
import { selectKrakenCandle, selectKrakenCandles } from 'ducks/selectors';
import { handleApiError as handleApiErrorOperator } from 'ducks/operators/settings';
import { setLoading as setLoadingAction } from 'ducks/actions';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import classNames from 'classnames';
import cn from './StrategiesPage.module.scss';

class ConnectedStrategyKrakenBlock extends Component {
  static propTypes = {
    candles: PropTypes.object,
    candle: PropTypes.object,
    getKrakenCandles: PropTypes.func,
    setLoading: PropTypes.func,
    handleApiError: PropTypes.func,
  };

  static defaultProps = {
    candles: [],
    candle: {
      open: 0,
      high: 0,
      low: 0,
      close: 0,
    },
  };

  state = {
    pair: 'XXBTZUSD',
    days: 'today',
    start_date: '',
    end_date: '',
    interval: 'm1',
  };

  componentDidMount() {
    this.setState({
      start_date: moment
        .utc()
        .startOf('day')
        .format(),
      end_date: moment.utc().format(),
    });
  }

  handleChartData = async () => {
    const { setLoading, handleApiError, getKrakenCandles } = this.props;
    const { interval, start_date, end_date, pair } = this.state;

    const data = {
      interval,
      start_date,
      end_date,
      pair,
    };

    setLoading(true);
    try {
      await getKrakenCandles(data);
    } catch (err) {
      handleApiError(err);
    }
    setLoading(false);
  };

  handleInterval = async interval => {
    await this.setState({ interval });
    await this.handleChartData();
  };

  handleDays = async days => {
    const start_date = moment().startOf('day');
    if (days !== 'today') {
      start_date.subtract(days, 'days');
    }
    await this.setState({ days, start_date: start_date.format() });
    await this.handleChartData();
  };

  render() {
    const { candles, candle } = this.props;
    const { open, high, low, close, volume } = candle;
    const { days, interval } = this.state;
    return (
      <div className={cn.panelRight}>
        <div className={cn.header}>
          <p className={cn.exchange}>Kraken XXBTZUSD</p>
          <div className={cn.flex} />
          <p className={cn.base}>Volume:</p>
          <p className={cn.text}>{volume}</p>
          <p className={cn.base}>Price:</p>
          <p className={cn.text}>{close}</p>
        </div>
        <div className={cn.control}>
          <p
            className={classNames(cn.selector, {
              [cn.active]: days === 'today',
            })}
            onClick={() => this.handleDays('today')}
            role="presentation"
          >
            Today
          </p>
          <p
            className={classNames(cn.selector, {
              [cn.active]: days === '1',
            })}
            onClick={() => this.handleDays('1')}
            role="presentation"
          >
            1D
          </p>
          <p
            className={classNames(cn.selector, {
              [cn.active]: days === '7',
            })}
            onClick={() => this.handleDays('7')}
            role="presentation"
          >
            1W
          </p>
          <p
            className={classNames(cn.selector, {
              [cn.active]: days === '30',
            })}
            onClick={() => this.handleDays('30')}
            role="presentation"
          >
            1M
          </p>
          <div className={cn.flex} />
          <p
            className={classNames(cn.selector, {
              [cn.active]: interval === 'm1',
            })}
            onClick={() => this.handleInterval('m1')}
            role="presentation"
          >
            1M
          </p>
          <p
            className={classNames(cn.selector, {
              [cn.active]: interval === 'm5',
            })}
            onClick={() => this.handleInterval('m5')}
            role="presentation"
          >
            5M
          </p>
          <p
            className={classNames(cn.selector, {
              [cn.active]: interval === 'h1',
            })}
            onClick={() => this.handleInterval('h1')}
            role="presentation"
          >
            1H
          </p>
          <p
            className={classNames(cn.selector, {
              [cn.active]: interval === 'd1',
            })}
            onClick={() => this.handleInterval('d1')}
            role="presentation"
          >
            1D
          </p>
        </div>
        <div className={cn.chart}>
          <Line
            data={{
              labels: candles.dates,
              datasets: [
                {
                  label: ' Close',
                  borderColor: '#fff',
                  borderWidth: 2,
                  lineTension: 0.1,
                  pointRadius: 0,
                  pointBorderWidth: 0,
                  pointHoverRadius: 3,
                  pointBackgroundColor: '#fff',
                  pointHitRadius: 10,
                  fill: false,
                  data: candles.data,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              layout: {},
              legend: {
                display: false,
              },
              tooltips: {
                mode: 'label',
                position: 'nearest',
                xPadding: 20,
              },
              scales: {
                color: '#fff',
                xAxes: [
                  {
                    display: false,
                  },
                ],
                yAxes: [
                  {
                    position: 'right',
                    ticks: {
                      fontColor: '#fff',
                    },
                  },
                ],
              },
            }}
          />
        </div>
        <div className={cn.footer}>
          <div className={cn.candle}>
            <p>Last Open</p>
            <p>{open}</p>
          </div>
          <div className={cn.candle}>
            <p>Last High</p>
            <p>{high}</p>
          </div>
          <div className={cn.candle}>
            <p>Last Low</p>
            <p>{low}</p>
          </div>
          <div className={cn.candle}>
            <p>Last Close</p>
            <p>{low}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  candle: selectKrakenCandle(state),
  candles: selectKrakenCandles(state),
});

const mapDispatchToProps = {
  handleApiError: handleApiErrorOperator,
  getKrakenCandles: getKrakenCandlesOperator,
  setLoading: setLoadingAction,
};

export const StrategyKrakenBlock = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedStrategyKrakenBlock);
