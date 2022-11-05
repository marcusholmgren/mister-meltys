import React from 'react';
import classNames from 'classnames';

import './Button.css';

const Button = ({ label, priority, className, size, onClick, type = 'button' }) => {
  const classes = classNames(
    'button',
    {
      [`button--${priority}`]: priority,
      [`button--size-${size}`]: size,
    },
    className,
  );

  return (
    <button
      className={classes}
      onClick={onClick}
      type={type}
    >
      {label}
    </button>
  );
};

Button.defaultProps = {
  priority: 'primary',
  onClick: () => {},
};

export default Button;
