import React, { PureComponent, Suspense } from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from 'react-router-dom';
import { Loading } from 'components/loading/Loading';
import { routes } from 'layout/routes/routes';
import { PublicRoute } from 'layout/routes/PublicRoute';
import { ValidateRoute } from 'layout/routes/ValidateRoute';
import { PrivateRoute } from 'layout/routes/PrivateRoute';
import * as Sentry from '@sentry/browser';
import * as pages from 'layout/pages/async';
class ConnectedApp extends PureComponent {
  componentDidMount() {
    const {
      REACT_APP_ENV,
      REACT_APP_SENTRY_DSN,
      REACT_APP_VERSION,
    } = window.env;

    if (REACT_APP_ENV === 'development') {
      return;
    }
    Sentry.init({
      dsn: REACT_APP_SENTRY_DSN,
      release: `skydax@${REACT_APP_VERSION}`,
      environment: REACT_APP_ENV,
    });
  }

  render() {
    return (
      <Router basename="/">
        <Suspense fallback={<Loading variant="dark" />}>
          <Switch>
            <Redirect exact from={routes.ROOT} to={routes.VALIDATE} />
            <PublicRoute
              exact
              path={routes.LOGIN}
              component={pages.LoginPage}
            />
            <ValidateRoute
              exact
              path={routes.VALIDATE}
              component={pages.ValidatePage}
            />
            <PrivateRoute
              exact
              path={routes.STRATEGIES}
              component={pages.StrategiesPage}
            />
            <PrivateRoute
              exact
              path={routes.BITMEX_STRATEGY}
              component={pages.BitmexPage}
            />
            <Route component={pages.ErrorPage} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
});

export const App = connect(mapStateToProps)(ConnectedApp);
