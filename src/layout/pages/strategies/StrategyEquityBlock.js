import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { selectBitmexCandles, selectBitmexEquity } from 'ducks/selectors';
import { Line } from 'react-chartjs-2';
import cn from './StrategiesPage.module.scss';

class ConnectedStrategyEquityBlock extends PureComponent {
  static propTypes = {
    candles: PropTypes.object,
    equity: PropTypes.object,
    candle: PropTypes.object,
  };

  render() {
    const { candles, equity, candle } = this.props;
    const { close, volume } = candle;
    return (
      <div className={cn.panelRight}>
        <div className={cn.header}>
          <p className={cn.exchange}>BitMEX</p>
          <div className={cn.flex} />
          <p className={cn.pair}>XBTUSD</p>
          <p className={cn.base}>Last Volume:</p>
          <p className={cn.text}>{volume}</p>
          <p className={cn.base}>Last Price:</p>
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

export const StrategyEquityBlock = connect(
  mapStateToProps,
  null,
)(ConnectedStrategyEquityBlock);
