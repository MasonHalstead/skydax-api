import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from './Input.module.scss';

export const InputIcon = ({ icon, handleOnFocus }) => (
  <div onClick={handleOnFocus} className={cn.inputIcon}>
    <FontAwesomeIcon icon={icon} />
  </div>
);
InputIcon.defaultProps = {
  icon: 'chevron-down',
  handleOnFocus: () => {},
};
InputIcon.propTypes = {
  icon: PropTypes.string,
  handleOnFocus: PropTypes.func,
};
