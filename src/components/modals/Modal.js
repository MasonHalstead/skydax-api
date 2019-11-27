import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from './Modal.module.scss';

export const Modal = ({ open, handleClose, children, width }) => {
  const node = useRef();
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
    <>
      {open && (
        <div className={cn.modal}>
          <div
            className={cn.content}
            ref={node}
            style={{ minWidth: width, maxWidth: width }}
          >
            <div className={cn.close} onClick={handleClose}>
              <FontAwesomeIcon icon="times" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

Modal.defaultProps = {
  width: '500px',
  open: false,
  handleClose: () => {},
};

Modal.propTypes = {
  width: PropTypes.string,
  open: PropTypes.bool,
  children: PropTypes.any,
  handleClose: PropTypes.func,
};
