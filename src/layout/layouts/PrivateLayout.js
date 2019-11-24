import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Navigation } from 'components/navigation/Navigation';
import { Loading } from 'components/loading/Loading';
import cn from './Layouts.module.scss';
class ConnectedPrivateLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.object,
    location: PropTypes.object,
    loading: PropTypes.bool,
  };

  render() {
    const { children, loading, location } = this.props;
    return (
      <div className={cn.privateContainer}>
        <Navigation />
        <div className={cn.privateContent}>{children}</div>
        <p className={cn.version}>v {process.env.REACT_APP_VERSION}</p>
        {loading && <Loading variant="dark" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.settings.loading,
});

export const PrivateLayout = withRouter(
  connect(mapStateToProps)(ConnectedPrivateLayout),
);
