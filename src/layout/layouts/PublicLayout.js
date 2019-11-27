import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Loading } from 'components/loading/Loading';
import classNames from 'classnames';
import cn from './Layouts.module.scss';

export class ConnectedPublicLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.object,
    location: PropTypes.object,
    variant: PropTypes.string,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    variant: 'primary',
  };

  render() {
    const { children, loading, variant, location } = this.props;
    const { pathname } = location;
    const year = new Date().getFullYear();
    return (
      <div className={classNames(cn.publicContainer, cn[variant])}>
        <div className={cn.publicHeader}>
          {pathname !== '/login' && <Link to="/login">Login</Link>}
          {pathname !== '/register' && <Link to="/register">Register</Link>}
          {pathname !== '/password' && (
            <Link to="/password">Forgot Password</Link>
          )}
        </div>
        {children}
        <div className={cn.publicFooter}>
          <Link to="/company">Company</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
          <div className={cn.flex} />
          <p>&copy; {year} Skydax</p>
        </div>
        {loading && <Loading variant="dark" />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.settings.loading,
});

export const PublicLayout = withRouter(
  connect(mapStateToProps)(ConnectedPublicLayout),
);
