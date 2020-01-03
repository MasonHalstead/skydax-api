import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser as logoutUserAction, setModal as setModalAction } from 'ducks/actions';
import { Tooltip } from 'components/tooltip/Tooltip';
import { getData } from 'utils/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import cn from './Navigation.module.scss';
const { PUBLIC_URL } = process.env;

export class ConnectedNavigation extends React.PureComponent {
  static propTypes = {
    logoutUser: PropTypes.func,
    setModal: PropTypes.func,
  };

  state = {
    status: 1,
  };

  componentDidMount() {
    this.handleStatus();
  }

  handleStatus = async () => {
    try {
      await getData('/auth/bitmex');
      this.setState({ status: 3 });
    } catch {
      this.setState({ status: 2 });
    }
  };

  handleLogout = () => {
    const { logoutUser } = this.props;
    logoutUser();
  };

  handleModals = modal => {
    const { setModal } = this.props;
    setModal(modal);
  };

  render() {
    const { status } = this.state;
    return (
      <div className={cn.navigation}>
        <img className={cn.logo} src={`${PUBLIC_URL}/skydax-banner.png`} alt="Skydax Logo" />
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
        <div className={cn.actions} onClick={() => this.handleModals({ user_settings: true })}>
          <FontAwesomeIcon icon={['fas', 'cog']} />
          <Tooltip title="Settings" top={50} />
        </div>
        <div className={cn.actions}>
          <FontAwesomeIcon icon={['fas', 'wallet']} />
          <Tooltip title="Wallet" top={50} />
        </div>
        <div className={cn.actions} onClick={this.handleLogout}>
          <FontAwesomeIcon icon={['fas', 'sign-out-alt']} />
          <Tooltip title="Logout" top={50} />
        </div>
        <div className={cn.status}>
          <span
            className={classNames(
              { [cn.missing]: status === 1 },
              { [cn.disconnected]: status === 2 },
              { [cn.connected]: status === 3 },
            )}
          ></span>
          <Tooltip title="Bitmex Connection" top={50} />
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
  setModal: setModalAction,
};

export const Navigation = connect(mapStateToProps, mapDispatchToProps)(ConnectedNavigation);
