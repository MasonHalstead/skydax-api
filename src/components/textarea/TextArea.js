import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TextAreaBase } from './TextAreaBase';
import cn from './TextArea.module.scss';

export class TextArea extends Component {
  static propTypes = {
    component: PropTypes.any,
    label: PropTypes.string,
    left_icon: PropTypes.any,
    right_icon: PropTypes.any,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    value: PropTypes.any,
    bulk: PropTypes.bool,
    margin: PropTypes.string,
    background: PropTypes.string,
    width: PropTypes.string,
    handleOnKeyDown: PropTypes.func,
    handleClose: PropTypes.func,
    handleOnFocus: PropTypes.func,
    handleToggle: PropTypes.func,
    handleOnChange: PropTypes.func,
  };

  static defaultProps = {
    label: '',
    value: '',
    placeholder: '',
    disabled: false,
    margin: '0px',
    background: 'transparent',
    width: 'initial',
    bulk: false,
    component: TextAreaBase,
    handleClose() {},
    handleOnFocus() {},
    handleToggle() {},
    handleOnChange() {},
    handleOnKeyDown() {},
  };

  state = {
    focus: false,
  };

  handleOnFocus = () => {
    this.setState({ focus: true });
  };

  handleOnBlur = () => {
    this.setState({ focus: false });
  };

  handleOnChange = e => {
    const { handleOnChange } = this.props;
    handleOnChange({ value: e.target.value });
  };

  render() {
    const {
      component: TextAreaComponent,
      label,
      bulk,
      margin,
      background,
      width,
      disabled,
      ...rest
    } = this.props;
    const { focus } = this.state;
    return (
      <div className={cn.container} style={{ margin, width, background }}>
        {label && <p className={cn.label}>{label}</p>}
        <div
          className={classNames(cn.textContainer, {
            [cn.textBulk]: bulk,
            [cn.textDisabled]: disabled,
            [cn.textFocus]: focus,
          })}
        >
          <TextAreaComponent
            {...rest}
            handleOnChange={this.handleOnChange}
            handleOnBlur={this.handleOnBlur}
            handleOnFocus={this.handleOnFocus}
          />
        </div>
      </div>
    );
  }
}
