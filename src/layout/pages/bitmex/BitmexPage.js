import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tooltip } from 'components/tooltip/Tooltip';
import { getBitmexStrategy as getBitmexStrategyOperator } from 'ducks/operators/bitmex';
import { setLoading as setLoadingAction } from 'ducks/actions';
import cn from './BitmexPage.module.scss';

export class BitmexPage extends Component {
  static propTypes = {
    getBitmexStrategy: PropTypes.func,
    setLoading: PropTypes.func,
    strategy: PropTypes.object,
    wallet: PropTypes.object,
    funding: PropTypes.object,
    location: PropTypes.object,
  };

  state = {};

  componentDidMount = () => {
    this.handleInitialData();
  };

  handleInitialData = async () => {
    const { setLoading, getBitmexStrategy, location } = this.props;
    const [, , , pair] = location.pathname.split('/');
    setLoading(true);
    try {
      await getBitmexStrategy(pair);
    } catch {
      console.log('Bitmex Strategy Error');
    }
    setLoading(false);
  };

  render() {
    const { wallet, strategy, funding } = this.props;
    return (
      <div className={cn.page}>
        <div className={cn.positionBlock}>
          <div className={cn.wallet}>
            <div className={cn.info}>
              <p>Balance</p>
              <p>{wallet.balance}</p>
            </div>
            <div className={cn.info}>
              <p></p>
              <p>{wallet.satoshi_balance}</p>
            </div>
            <div className={cn.info}>
              <p>Margin Balance</p>
              <p>{wallet.margin_balance}</p>
            </div>
            <div className={cn.info}>
              <p></p>
              <p>{wallet.satoshi_margin_balance}</p>
            </div>
            <div className={cn.flex} />
            <div className={cn.info}>
              <p>Leverage</p>
              <p>{strategy.leverage}</p>
            </div>
            <div className={cn.info}>
              <p>Avail. Margin</p>
              <p>{wallet.satoshi_avail_margin_balance}</p>
            </div>
            <div className={cn.info}>
              <p>Funding</p>
              <p>{funding.funding_time}</p>
            </div>
            <div className={cn.info}>
              <p>Funding Rate</p>
              <p>{funding.funding_rate}</p>
            </div>
          </div>
          <div className={cn.position}>
            <div className={cn.info}>
              <p>{strategy.pair}</p>
              <div className={cn.positionTooltip}>
                {strategy.open === true && (
                  <>
                    <span className={cn.open}></span>
                    <Tooltip title="Position Open" right={15} top={0} />
                  </>
                )}
                {strategy.open === false && (
                  <>
                    <span className={cn.closed}></span>
                    <Tooltip title="Position Closed" />
                  </>
                )}
              </div>
            </div>
            <div className={cn.info}>
              <p>Quantity</p>
              <p>{strategy.quantity}</p>
            </div>
            <div className={cn.info}>
              <p>Satoshi</p>
              <p>{strategy.satoshi}</p>
            </div>
            <div className={cn.info}>
              <p>Commission</p>
              <p>{strategy.commission}</p>
            </div>
            <div className={cn.info}>
              <p>Entry Price</p>
              <p>{strategy.entry_price}</p>
            </div>
            <div className={cn.info}>
              <p>Last Price</p>
              <p>{strategy.last_price}</p>
            </div>
            <div className={cn.info}>
              <p>Liquidation Price</p>
              <p>{strategy.liquidation}</p>
            </div>
            <div className={cn.flex} />
            <div className={cn.info}>
              <p>Realised PNL</p>
              <p>{strategy.realised_pnl}</p>
            </div>
            <div className={cn.info}>
              <p>Unealised PNL</p>
              <p>{strategy.unrealised_pnl}</p>
            </div>
          </div>
        </div>
        <div className={cn.chartBlock}>
          <p>activty</p>
        </div>
        <div className={cn.activityBlock}>
          <p>activty</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  funding: state.funding,
  strategy: state.strategy,
  wallet: state.wallet,
});

const mapDispatchToProps = {
  setLoading: setLoadingAction,
  getBitmexStrategy: getBitmexStrategyOperator,
};

export default connect(mapStateToProps, mapDispatchToProps)(BitmexPage);
