import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStrategies as getStrategiesOperator } from 'ducks/operators/strategies';
import { setLoading as setLoadingAction } from 'ducks/actions';
import cn from './BitmexPage.module.scss';

export class BitmexPage extends Component {
  static propTypes = {
    getStrategies: PropTypes.func,
    setLoading: PropTypes.func,
  };

  state = {
  };

  componentDidMount = () => {
    this.handleInitialData();
  };

  handleInitialData = async () => {
    const { setLoading, getStrategies } = this.props;
    setLoading(true);
    try {
      // await getStrategies();
    } catch {
      console.log('Strategies Error');
    }
    setLoading(false);
  };

  render() {
    return (
      <div className={cn.page}>
          <div className={cn.positionBlock}>
              <p>activty</p>
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
  strategies: state.strategies,
});

const mapDispatchToProps = {
  setLoading: setLoadingAction,
  getStrategies: getStrategiesOperator,
};

export default connect(mapStateToProps, mapDispatchToProps)(BitmexPage);
