import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { selectPrivateVerifiedUser, selectPrivateUser } from 'ducks/selectors';
import { routes } from 'layout/routes/routes';
import { ValidateLayout } from 'layout/layouts/ValidateLayout';

class ConnectedValidateRoute extends PureComponent {
  static propTypes = {
    privateUser: PropTypes.bool,
    privateVerifiedUser: PropTypes.bool,
    component: PropTypes.object,
    layout: PropTypes.any,
    location: PropTypes.object,
  };

  render() {
    const {
      component: Component,
      privateUser,
      privateVerifiedUser,
      location,
      ...rest
    } = this.props;
    if (privateVerifiedUser) {
      return (
        <Route
          key={location.pathname}
          {...rest}
          render={props => (
            <Redirect
              to={{
                pathname: routes.STRATEGIES,
                state: {
                  from: props.location,
                },
              }}
            />
          )}
        />
      );
    }
    if (!privateVerifiedUser && !privateUser) {
      return (
        <Route
          key={location.pathname}
          {...rest}
          render={props => (
            <Redirect
              to={{
                pathname: routes.LOGIN,
                state: {
                  from: props.location,
                },
              }}
            />
          )}
        />
      );
    }
    return (
      <Route
        key={location.pathname}
        {...rest}
        render={props => (
          <ValidateLayout>
            <Component {...props} />
          </ValidateLayout>
        )}
      />
    );
  }
}
const mapStateToProps = state => ({
  privateUser: selectPrivateUser(state),
  privateVerifiedUser: selectPrivateVerifiedUser(state),
});

export const ValidateRoute = withRouter(
  connect(mapStateToProps)(ConnectedValidateRoute),
);
