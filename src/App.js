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
import * as pages from 'layout/pages/async';
class ConnectedApp extends PureComponent {
  render() {
    return (
      <Router basename="/">
        <Suspense fallback={<Loading variant="dark" />}>
          <Switch>
            <Redirect exact from={routes.ROOT} to={routes.VALIDATION} />
            <PublicRoute
              exact
              path={routes.LOGIN}
              component={pages.LoginPage}
            />
            <ValidateRoute
              exact
              path={routes.VALIDATION}
              component={pages.ValidatePage}
            />
            <PrivateRoute
              exact
              path={routes.SANDBOX}
              component={pages.SandboxPage}
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
