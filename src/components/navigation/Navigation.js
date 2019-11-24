import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser as logoutUserAction } from 'ducks/actions';
import { Tooltip } from 'components/tooltip/Tooltip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import cn from './Navigation.module.scss';
const { PUBLIC_URL } = process.env;

export class ConnectedNavigation extends React.PureComponent {
  static propTypes = {
    logoutUser: PropTypes.func,
  };

  state = {
    status: 1,
  };

  handleLogout = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };

  render() {
    const { status } = this.state;
    return (
      <div className={cn.navigation}>
        <img
          className={cn.logo}
          src={`${PUBLIC_URL}/skydax-banner.png`}
          alt="Skydax Logo"
        />
        <Link className={cn.link} to="/docs">
          Docs
        </Link>
        <Link className={cn.link} to="/portfolio">
          Portfolio
        </Link>
        <Link className={cn.link} to="/funds">
          Managed Funds
        </Link>
        <Link className={cn.link} to="/strategies">
          Strategies
        </Link>
        <div className={cn.flex} />
        <div className={cn.actions}>
          <FontAwesomeIcon icon={['fas', 'cog']} />
          <Tooltip title="Settings" top={56} />
        </div>
        <div className={cn.actions}>
          <FontAwesomeIcon icon={['fas', 'wallet']} />
          <Tooltip title="Wallet" top={56} />
        </div>
        <div className={cn.actions} onClick={this.handleLogout}>
          <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
          <Tooltip title="Logout" top={56} />
        </div>
        <div className={cn.status}>
          <span
            className={classNames(
              { [cn.missing]: status === 1 },
              { [cn.disconnected]: status === 2 },
              { [cn.connected]: status === 3 },
            )}
          ></span>
          <Tooltip title="Bitmex Connection" top={56} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = {
  logoutUser: logoutUserAction,
};

export const Navigation = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedNavigation);
