import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TableEmpty } from './TableEmpty';
import cn from './Table.module.scss';

export class TableRows extends PureComponent {
  static propTypes = {
    callbacks: PropTypes.object,
    settings: PropTypes.object,
    headers: PropTypes.array,
    rows: PropTypes.array,
    row_component: PropTypes.any,
    cell_components: PropTypes.array,
  };

  render() {
    const {
      headers,
      rows,
      settings,
      callbacks,
      row_component: Row,
      cell_components,
      ...rest
    } = this.props;

    if (rows.length > 0) {
      return (
        <div className={cn.tableRowWrapper}>
          {rows.map(row => (
            <Row
              key={row.uuid}
              headers={headers}
              row={row}
              settings={settings}
              callbacks={callbacks}
              cell_components={cell_components}
              {...rest}
            />
          ))}
        </div>
      );
    }
    return <TableEmpty headers={headers} settings={settings} />;
  }
}
