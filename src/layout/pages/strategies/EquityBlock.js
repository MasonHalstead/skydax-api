import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getKrakenCandles as getKrakenCandlesOperator } from 'ducks/operators/charts';
import { selectBitmexCandles, selectBitmexEquity } from 'ducks/selectors';
import { handleApiError as handleApiErrorOperator } from 'ducks/operators/settings';
import { setLoading as setLoadingAction } from 'ducks/actions';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import classNames from 'classnames';
import cn from './StrategiesPage.module.scss';

class ConnectedEquityBlock extends Component {
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
    const { candles, equity, candle } = this.props;
    const { close, volume } = candle;
    return (
      <div className={cn.panelRight}>
        <div className={cn.header}>
          <p className={cn.exchange}>BitMEX</p>
          <div className={cn.flex} />
          <p className={cn.base}>Volume:</p>
          <p className={cn.text}>{volume}</p>
          <p className={cn.base}>Price:</p>
          <p className={cn.text}>{close}</p>
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
                  yAxisID: 'candle',
                  data: candles.data,
                },
                {
                  label: ' Equity',
                  borderColor: 'orange',
                  borderWidth: 2,
                  lineTension: 0.1,
                  pointRadius: 0,
                  pointBorderWidth: 0,
                  pointHoverRadius: 3,
                  pointBackgroundColor: 'orange',
                  pointHitRadius: 10,
                  fill: false,
                  yAxisID: 'equity',
                  data: equity.data,
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
                    id: 'equity',
                    position: 'left',
                    ticks: {
                      precision: 0,
                      fontColor: '#fff',
                      maxTicksLimit: 6,
                      callback(value) {
                        return `$${value}`;
                      },
                    },
                  },
                  {
                    id: 'candle',
                    position: 'right',
                    ticks: {
                      precision: 0,
                      fontColor: '#fff',
                      maxTicksLimit: 6,
                      callback(value) {
                        return `$${value}`;
                      },
                    },
                  },
                ],
              },
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  candle: state.candle,
  candles: selectBitmexCandles(state),
  equity: selectBitmexEquity(state),
});

const mapDispatchToProps = {
  handleApiError: handleApiErrorOperator,
  getKrakenCandles: getKrakenCandlesOperator,
  setLoading: setLoadingAction,
};

export const EquityBlock = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedEquityBlock);
