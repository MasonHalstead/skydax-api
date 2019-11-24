import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cn from './Table.module.scss';
import { TableCell } from './TableCell';

function compareJSON(array1 = [], array2 = []) {
  return JSON.stringify(array1) === JSON.stringify(array2);
}
export class TableRow extends Component {
  static propTypes = {
    row: PropTypes.object,
    headers: PropTypes.array,
    settings: PropTypes.object,
    creative_groups: PropTypes.array,
    state_classes: PropTypes.object,
    callbacks: PropTypes.object,
    cell_components: PropTypes.array,
  };

  static defaultProps = {
    row: [],
    headers: [],
    callbacks: {},
    cell_components: [],
  };

  shouldComponentUpdate(nextProps) {
    const { row, headers } = nextProps;
    const { props } = this;

    if (!compareJSON(row, props.row) || !compareJSON(headers, props.headers)) {
      return true;
    }
    return false;
  }

  render() {
    const {
      headers,
      row,
      settings,
      callbacks,
      cell_components,
      ...rest
    } = this.props;

    const row_styles = {
      minHeight: `${settings.row_height}px`,
      maxHeight: `${settings.row_height}px`,
    };
    if (settings.row_flex) {
      row_styles.maxHeight = 'auto';
    }
    return (
      <div className={cn.tableRow} style={row_styles}>
        {cell_components.map((ChildComponent, index) => {
          const cell_key = `${row.uuid}${index}`;
          return (
            <TableCell row={row} key={cell_key} header={headers[index]}>
              <ChildComponent
                row={row}
                column_index={index}
                header={headers[index]}
                callbacks={callbacks}
                {...rest}
              />
            </TableCell>
          );
        })}
      </div>
    );
  }
}
