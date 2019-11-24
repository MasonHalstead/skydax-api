import React from 'react';
import PropTypes from 'prop-types';
import DebounceInput from 'react-debounce-input';
import cn from './Input.module.scss';

export const InputDebounce = React.memo(
  ({
    type,
    min,
    auto_focus,
    text_align,
    debounce,
    placeholder,
    disabled,
    handleOnFocus,
    handleOnBlur,
    handleOnKeyDown,
    handleOnChange,
  }) => (
    <DebounceInput
      minLength={1}
      debounceTimeout={debounce}
      className={cn.input}
      spellCheck="false"
      autoComplete="new-password"
      placeholder={placeholder}
      disabled={disabled}
      style={{ textAlign: text_align }}
      type={type}
      min={min}
      autoFocus={auto_focus}
      onChange={handleOnChange}
      onFocus={handleOnFocus}
      onBlur={handleOnBlur}
      onKeyDown={handleOnKeyDown}
    />
  ),
);
InputDebounce.defaultProps = {
  placeholder: '',
  type: 'text',
  min: 0,
  text_align: 'left',
  debounce: 300,
  auto_focus: false,
  disabled: false,
  handleOnBlur: () => {},
  handleOnFocus: () => {},
  handleOnChange: () => {},
  handleOnKeyDown: () => {},
};
InputDebounce.propTypes = {
  disabled: PropTypes.any,
  type: PropTypes.string,
  min: PropTypes.number,
  text_align: PropTypes.string,
  auto_focus: PropTypes.bool,
  placeholder: PropTypes.string,
  debounce: PropTypes.number,
  handleOnBlur: PropTypes.func,
  handleOnChange: PropTypes.func,
  handleOnFocus: PropTypes.func,
  handleOnKeyDown: PropTypes.func,
};
