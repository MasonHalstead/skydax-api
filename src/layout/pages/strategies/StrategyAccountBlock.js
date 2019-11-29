import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import cn from './StrategiesPage.module.scss';

class ConnectedStrategyAccountBlock extends PureComponent {
  static propTypes = {
    wallet: PropTypes.object,
    funding: PropTypes.object,
  };

  static defaultProps = {
    wallet: {},
    funding: {},
  };

  render() {
    const { wallet, funding } = this.props;
    return (
      <div className={cn.panelLeft}>
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
          <p>{wallet.leverage}</p>
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
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  wallet: state.wallet,
  funding: state.funding,
});

export const StrategyAccountBlock = connect(
  mapStateToProps,
  null,
)(ConnectedStrategyAccountBlock);
