import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownContainer } from './DropdownContainer';
import { InputFake } from '../inputs/InputFake';

export class Dropdown extends Component {
  static propTypes = {
    label: PropTypes.string,
    left_icon: PropTypes.any,
    right_icon: PropTypes.any,
    text_align: PropTypes.any,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    empty_text: PropTypes.string,
    rows: PropTypes.array,
    extended: PropTypes.array,
    row_key: PropTypes.string,
    margin: PropTypes.string,
    width: PropTypes.string,
    select_title: PropTypes.string,
    background: PropTypes.string,
    bulk: PropTypes.bool,
    handleOnSelect: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    value: '',
    placeholder: 'Select...',
    disabled: false,
    left_icon: '',
    right_icon: 'chevron-down',
    text_align: 'left',
    type: 'text',
    margin: '0px',
    background: 'transparent',
    width: 'initial',
    bulk: false,
    rows: [],
    extended: [],
    row_key: 'uuid',
    select_title: '',
    empty_text: 'Nothing returned',
    handleOnSelect: () => {},
  };

  state = {
    selected: '',
  };

  componentDidMount() {
    const { value } = this.props;
    this.setState({ selected: value });
  }

  handleOnSelect = row => {
    const { handleOnSelect, row_key } = this.props;
    this.setState({ selected: row[row_key] });
    handleOnSelect(row);
  };

  render() {
    const {
      label,
      left_icon,
      right_icon,
      placeholder,
      disabled,
      type,
      width,
      text_align,
      background,
      margin,
      extended,
      select_title,
      row_key,
      empty_text,
      bulk,
    } = this.props;
    const { selected } = this.state;
    const { rows } = this.props;

    return (
      <DropdownContainer
        handleOnSelect={this.handleOnSelect}
        disabled={disabled}
        bulk={bulk}
        margin={margin}
        width={width}
        background={background}
        input={{
          component: InputFake,
          label,
          value: selected,
          text_align,
          placeholder,
          left_icon,
          right_icon,
          type,
        }}
        select={{
          rows,
          extended,
          select_title,
          selected,
          row_key,
          empty_text,
          disabled,
        }}
      />
    );
  }
}
