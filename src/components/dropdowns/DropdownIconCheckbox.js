import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropdownContainer } from './DropdownContainer';
import { InputIconList } from '../inputs/InputIconList';
import { SelectCheckbox } from '../selects/SelectCheckbox';

export class DropdownIconCheckbox extends Component {
  static propTypes = {
    label: PropTypes.string,
    icon: PropTypes.any,
    disabled: PropTypes.bool,
    empty_text: PropTypes.string,
    rows: PropTypes.array,
    tooltip: PropTypes.any,
    extended: PropTypes.array,
    selected: PropTypes.array,
    row_key: PropTypes.string,
    left: PropTypes.any,
    right: PropTypes.any,
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
    left: 'auto',
    right: 0,
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
      icon,
      disabled,
      rows,
      width,
      tooltip,
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
        tooltip={tooltip}
        input={{
          component: InputIconList,
          label,
          selected,
          icon,
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
          left,
          right,
          width: 'max-content',
        }}
      />
    );
  }
}
