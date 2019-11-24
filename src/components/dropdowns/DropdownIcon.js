import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownContainer } from './DropdownContainer';
import { InputIcon } from '../inputs/InputIcon';

export class DropdownIcon extends Component {
  static propTypes = {
    label: PropTypes.string,
    icon: PropTypes.any,
    left: PropTypes.any,
    right: PropTypes.any,
    tooltip: PropTypes.any,
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
    disabled: false,
    tooltip: false,
    icon: 'list',
    margin: '0px',
    background: 'transparent',
    width: '34px',
    bulk: false,
    left: 'auto',
    right: 0,
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
      disabled,
      tooltip,
      icon,
      width,
      background,
      margin,
      extended,
      select_title,
      row_key,
      empty_text,
      bulk,
      left,
      right,
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
        tooltip={tooltip}
        input={{
          component: InputIcon,
          label,
          icon,
        }}
        select={{
          rows,
          extended,
          select_title,
          selected,
          row_key,
          empty_text,
          disabled,
          left,
          right,
          width: 'max-content',
        }}
      />
    );
  }
}
