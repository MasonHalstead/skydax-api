import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { selectBitmexCandles, selectBitmexEquity } from 'ducks/selectors';
import { handleChartScales } from 'utils/helpers';
import { Line } from 'react-chartjs-2';
import cn from './StrategiesPage.module.scss';

class ConnectedStrategyEquityBlock extends PureComponent {
  static propTypes = {
    candles: PropTypes.object,
    equity: PropTypes.object,
    candle: PropTypes.object,
  };

  state = {
    chart: 1,
  };

  handleChartToggle = () => {
    const { chart } = this.state;
    this.setState({ chart: chart === 1 ? 2 : 1 });
  };

  render() {
    const { chart } = this.state;
    const { candles, equity, candle } = this.props;
    const { close, volume } = candle;
    const scale = handleChartScales(candles, equity);
    return (
      <div className={cn.panelRight}>
        <div className={cn.header}>
          <p
            className={cn.exchange}
            onClick={this.handleChartToggle}
            role="presentation"
          >
            <span className={cn.spacer}>BitMEX</span>{' '}
            <FontAwesomeIcon
              icon={chart === 1 ? 'dollar-sign' : 'percentage'}
            />
          </p>
          <div className={cn.flex} />
          <p className={cn.pair}>XBTUSD</p>
          <p className={cn.base}>Last Volume:</p>
          <p className={cn.text}>{volume}</p>
          <p className={cn.base}>Last Price:</p>
          <p className={cn.text}>{close}</p>
        </div>
        {chart === 1 && (
          <div className={cn.chartPrice}>
            <Line
              data={{
                labels: [],
                datasets: [
                  {
                    label: ' Last Price',
                    borderColor: 'rgba(255, 255, 255, 0.9)',
                    borderWidth: 2,
                    lineTension: 0.1,
                    pointRadius: 0,
                    pointBorderWidth: 0,
                    pointHoverRadius: 3,
                    pointBackgroundColor: 'rgba(255, 255, 255, 0.9)',
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
                  callbacks: {
                    label(tooltipItem, data) {
                      let label =
                        data.datasets[tooltipItem.datasetIndex].label || '';
                      if (label) {
                        label += `: $${tooltipItem.yLabel}`;
                      }
                      return label;
                    },
                  },
                },
                scales: {
                  color: '#fff',
                  xAxes: [
                    {
                      display: false,
                      type: 'time',
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
                        suggestedMin: (scale.min * equity.base) / 100,
                        suggestedMax: (scale.max * equity.base) / 100,
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
                        suggestedMin: (scale.min * candles.base) / 100,
                        suggestedMax: (scale.max * candles.base) / 100,
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
        )}
        {chart === 2 && (
          <div className={cn.chartPercent}>
            <Line
              data={{
                labels: [],
                datasets: [
                  {
                    label: ' Candle Change',
                    borderColor: 'rgba(255, 255, 255, 0.9)',
                    borderWidth: 2,
                    lineTension: 0.1,
                    pointRadius: 0,
                    pointBorderWidth: 0,
                    pointHoverRadius: 3,
                    pointBackgroundColor: 'rgba(255, 255, 255, 0.9)',
                    pointHitRadius: 10,
                    fill: false,
                    yAxisID: 'change',
                    data: candles.percent,
                  },
                  {
                    label: ' Equity Change',
                    borderColor: 'orange',
                    borderWidth: 2,
                    lineTension: 0.1,
                    pointRadius: 0,
                    pointBorderWidth: 0,
                    pointHoverRadius: 3,
                    pointBackgroundColor: 'orange',
                    pointHitRadius: 10,
                    fill: false,
                    yAxisID: 'change',
                    data: equity.percent,
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
                  callbacks: {
                    label(tooltipItem, data) {
                      let label =
                        data.datasets[tooltipItem.datasetIndex].label || '';
                      if (label) {
                        label += `: ${tooltipItem.yLabel}%`;
                      }
                      return label;
                    },
                  },
                },
                scales: {
                  color: '#fff',
                  xAxes: [
                    {
                      display: false,
                      type: 'time',
                    },
                  ],
                  yAxes: [
                    {
                      id: 'change',
                      ticks: {
                        precision: 0,
                        fontColor: '#fff',
                        maxTicksLimit: 6,
                        callback(value) {
                          return `${value} %`;
                        },
                      },
                    },
                  ],
                },
              }}
            />
          </div>
        )}
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
