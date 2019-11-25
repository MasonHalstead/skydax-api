import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Loading } from 'components/loading/Loading';
import cn from './Layouts.module.scss';
export class ConnectedValidateLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.object,
    loading: PropTypes.bool,
  };

  render() {
    const { children, loading } = this.props;
    return (
      <div className={cn.flex}>
        {children}
        <div className={cn.flexGrow} />
        <p className={cn.version}>v {window.env.REACT_APP_VERSION}</p>
        {loading && <Loading variant="dark" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.settings.loading,
});

export const ValidateLayout = withRouter(
  connect(mapStateToProps)(ConnectedValidateLayout),
);
