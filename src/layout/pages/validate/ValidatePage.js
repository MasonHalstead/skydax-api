import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  logoutUser as logoutUserAction,
  setLoading as setLoadingAction,
} from 'ducks/actions';
import { getData } from 'utils/axios';
import { Button } from 'components/buttons/Button';
import cn from './ValidatePage.module.scss';
const { PUBLIC_URL } = process.env;
export class ValidatePage extends React.PureComponent {
  static propTypes = {
    logoutUser: PropTypes.func,
    setLoading: PropTypes.func,
  };

  handleSubmit = async () => {
    const { setLoading, logoutUser } = this.props;
    setLoading(true);
    try {
      await getData('/users/resend/verfication');
      logoutUser();
    } catch (err) {
      logoutUser();
    }
    setLoading(false);
  };

  render() {
    return (
      <div className={cn.page}>
        <img
          src={`${PUBLIC_URL}/404.png`}
          alt="Cognitiv 404 Error"
          height={400}
        />
        <div className={cn.notFoundContainer}>
          <p className={cn.notFoundHeader}>
            Oops, email validation is required!
          </p>
          <p>
            You must verify your email address before accessing Skydax. Resend
            the confirmation email by clicking the button below.
          </p>
          <Button onClick={this.handleSubmit} variant="ghost">
            Send Verification Email
          </Button>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  logoutUser: logoutUserAction,
  setLoading: setLoadingAction,
};

export default connect(null, mapDispatchToProps)(ValidatePage);
