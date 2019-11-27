import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { selectPrivateVerifiedUser, selectPrivateUser } from 'ducks/selectors';
import { routes } from 'layout/routes/routes';
import { PublicLayout } from 'layout/layouts/PublicLayout';

class ConnectedPublicRoute extends PureComponent {
  static propTypes = {
    privateUser: PropTypes.bool,
    privateVerifiedUser: PropTypes.bool,
    component: PropTypes.object,
    variant: PropTypes.string,
    layout: PropTypes.any,
    location: PropTypes.object,
  };

  render() {
    const {
      component: Component,
      privateUser,
      variant,
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
    if (privateUser) {
      return (
        <Route
          key={location.pathname}
          {...rest}
          render={props => (
            <Redirect
              to={{
                pathname: routes.VALIDATE,
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
          <PublicLayout variant={variant}>
            <Component {...props} />
          </PublicLayout>
        )}
      />
    );
  }
}
const mapStateToProps = state => ({
  privateUser: selectPrivateUser(state),
  privateVerifiedUser: selectPrivateVerifiedUser(state),
});

export const PublicRoute = withRouter(
  connect(mapStateToProps)(ConnectedPublicRoute),
);
