import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../buttons/Button';
import cn from './Table.module.scss';

export class TableFooter extends PureComponent {
  static propTypes = {
    callbacks: PropTypes.object,
    settings: PropTypes.object,
  };

  render() {
    const { callbacks, settings } = this.props;
    const { footer, footer_label } = settings;
    if (!footer) {
      return null;
    }
    return (
      <div className={cn.tableFooter}>
        <Button onClick={() => callbacks.handleSubmit()}>{footer_label}</Button>
      </div>
    );
  }
}
