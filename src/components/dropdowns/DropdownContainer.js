import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Input } from '../inputs/Input';
import { Select } from '../selects/Select';
import { Tooltip } from '../tooltip/Tooltip';
import cn from './Dropdown.module.scss';

export const DropdownContainer = ({
  tooltip,
  input,
  select,
  margin,
  width,
  background,
  disabled,
  bulk,
  component: SelectComponent,
  handleOnKeyDown,
  handleOnRemove,
  handleOnChange,
  handleOnSelect,
  handleOnToggle,
  handleOnMultiSelect,
}) => {
  const [open, setToggle] = useState(false);
  const node = useRef();
  const handleOpen = () => {
    handleOnToggle(true);
    setToggle(true);
  };
  const handleClose = () => {
    handleOnToggle(false);
    setToggle(false);
  };
  const handleToggle = () => {
    handleOnToggle(!open);
    setToggle(!open);
  };
  const handleSelect = item => {
    handleOnSelect(item);
    handleClose();
  };
  const handleChange = item => {
    handleOnChange(item);
    setToggle(true);
  };
  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      return;
    }
    handleClose();
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });
  return (
    <div
      className={classNames(cn.dropdown, { [cn.dropdownBulk]: bulk })}
      ref={node}
      style={{ margin, width, background }}
    >
      <Input
        {...input}
        bulk={bulk}
        disabled={disabled}
        handleClose={handleClose}
        handleOnFocus={handleOpen}
        handleToggle={handleToggle}
        handleOnKeyDown={handleOnKeyDown}
        handleOnRemove={handleOnRemove}
        handleOnChange={handleChange}
      />
      {tooltip && <Tooltip title={tooltip} />}
      {open && !disabled && (
        <SelectComponent
          {...select}
          bulk={bulk}
          handleClose={handleClose}
          handleOpen={handleOpen}
          handleSelect={handleSelect}
          handleSelectMulti={handleOnMultiSelect}
        />
      )}
    </div>
  );
};

DropdownContainer.defaultProps = {
  input: {},
  select: {},
  tooltip: false,
  component: Select,
  disabled: false,
  margin: '',
  width: 'initial',
  background: 'transparent',
  bulk: false,
  handleOnKeyDown: () => {},
  handleOnChange: () => {},
  handleOnSelect: () => {},
  handleOnRemove: () => {},
  handleOnMultiSelect: () => {},
  handleOnToggle: () => {},
};

DropdownContainer.propTypes = {
  input: PropTypes.object,
  tooltip: PropTypes.any,
  select: PropTypes.object,
  disabled: PropTypes.bool,
  margin: PropTypes.string,
  width: PropTypes.string,
  background: PropTypes.string,
  bulk: PropTypes.bool,
  component: PropTypes.any,
  handleOnRemove: PropTypes.func,
  handleOnKeyDown: PropTypes.func,
  handleOnChange: PropTypes.func,
  handleOnSelect: PropTypes.func,
  handleOnMultiSelect: PropTypes.func,
  handleOnToggle: PropTypes.func,
};
