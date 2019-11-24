import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownContainer } from './DropdownContainer';
import { InputList } from '../inputs/InputList';
import { SelectCheckbox } from '../selects/SelectCheckbox';

export class DropdownCheckbox extends Component {
  static propTypes = {
    label: PropTypes.string,
    left_icon: PropTypes.any,
    right_icon: PropTypes.any,
    text_align: PropTypes.any,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    empty_text: PropTypes.string,
    rows: PropTypes.array,
    extended: PropTypes.array,
    selected: PropTypes.array,
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
    selected: [],
    extended: [],
    row_key: 'uuid',
    select_title: '',
    empty_text: 'Nothing returned',
    handleOnSelect: () => {},
  };

  state = {
    selected: [],
  };

  componentDidMount() {
    const { selected } = this.props;
    this.setState({ selected });
  }

  handleOnMultiSelect = (checked, row) => {
    let { selected } = this.state;
    const { handleOnSelect } = this.props;
    if (checked) {
      selected = this.filterSelectArray([...selected, row]);
    } else {
      selected.splice(
        selected.findIndex(i => i.uuid === row.uuid),
        1,
      );
    }
    this.setState({ selected });
    handleOnSelect(selected);
  };

  filterSelectArray = array =>
    Array.from(new Set(array.map(a => a.uuid))).map(uuid =>
      array.find(a => a.uuid === uuid),
    );

  render() {
    const {
      label,
      left_icon,
      right_icon,
      placeholder,
      disabled,
      rows,
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
    const { selected, value } = this.state;
    return (
      <DropdownContainer
        handleOnMultiSelect={this.handleOnMultiSelect}
        handleOnRemove={this.handleOnRemove}
        handleOnChange={this.handleOnChange}
        handleOnKeyDown={this.handleOnKeyDown}
        disabled={disabled}
        bulk={bulk}
        margin={margin}
        width={width}
        background={background}
        input={{
          component: InputList,
          value,
          label,
          selected,
          row_key,
          text_align,
          placeholder,
          left_icon,
          right_icon,
          type,
        }}
        component={SelectCheckbox}
        select={{
          rows,
          selected,
          value,
          extended,
          select_title,
          row_key,
          empty_text,
          disabled,
        }}
      />
    );
  }
}
