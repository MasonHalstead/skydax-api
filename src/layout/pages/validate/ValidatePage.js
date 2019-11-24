import React from 'react';
import { connect } from 'react-redux';

export class ValidatePage extends React.PureComponent {
  render() {
    return <div>validate something</div>;
  }
}

const mapDispatchToProps = {};

export default connect(null, mapDispatchToProps)(ValidatePage);
