import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { Loading } from 'components/loading/Loading';
import cn from './Layouts.module.scss';

export class ConnectedPublicLayout extends React.PureComponent {
  static propTypes = {
    children: PropTypes.object,
  };

  render() {
    const { children, loading } = this.props;
    const year = new Date().getFullYear();
    return (
      <div className={cn.publicContainer}>
        <div className={cn.publicHeader}>
          <Link to="/firebase">Register</Link>
          <Link to="/firebase">Forgot Password</Link>
        </div>
        {children}
        <div className={cn.publicFooter}>
        <Link to="/firebase">Company</Link>
          <Link to="/firebase">Privacy Policy</Link>
          <Link to="/firebase">Terms &amp; Conditions</Link>
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
