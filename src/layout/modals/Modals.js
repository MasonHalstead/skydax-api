import React from 'react';
import PropTypes from 'prop-types';
import { ApiError } from './ApiError';
import { UserSettings } from './UserSettings';

export class Modals extends React.PureComponent {
  static propTypes = {
    skydax_private: PropTypes.bool,
  };

  static defaultProps = {
    skydax_private: false,
  };

  render() {
    const { skydax_private } = this.props;
    return (
      <>
        <ApiError />
        {skydax_private && (
          <>
            <UserSettings />
          </>
        )}
      </>
    );
  }
}
