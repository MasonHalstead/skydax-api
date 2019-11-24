import React from 'react';
import PropTypes from 'prop-types';
import cn from './Input.module.scss';

export const InputList = ({
  badge,
  list,
  placeholder,
  selected,
  row_key,
  handleToggle,
}) => (
  <div className={cn.inputListContainer} onClick={handleToggle}>
    {placeholder && selected.length === 0 && (
      <p className={cn.placeholder}>{placeholder}</p>
    )}
    {badge && selected.length > 0 && (
      <div className={cn.badge}>{selected.length}</div>
    )}
    {list && selected.length > 0 && (
      <p>{selected.map(select => select[row_key]).join(', ')}</p>
    )}
    {!list && selected.length === 1 && <p>{selected[0][row_key]}</p>}
    {!list && selected.length > 1 && <p>Selected Items</p>}
  </div>
);
InputList.defaultProps = {
  placeholder: 'Select Items...',
  row_key: 'uuid',
  badge: true,
  list: true,
  selected: [],
  handleToggle: () => {},
};
InputList.propTypes = {
  row_key: PropTypes.string,
  badge: PropTypes.bool,
  list: PropTypes.bool,
  selected: PropTypes.array,
  placeholder: PropTypes.string,
  handleToggle: PropTypes.func,
};
