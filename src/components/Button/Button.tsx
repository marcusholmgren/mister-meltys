import React from 'react';
import classNames from 'classnames';

import './Button.css';

interface ButtonProps {
  label: string;
  priority?: 'primary' | 'secondary' | string; // Making it somewhat flexible
  className?: string;
  size?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'reset' | 'submit';
}

const Button: React.FC<ButtonProps> = ({
  label,
  priority = 'primary',
  className,
  size,
  onClick = () => {},
  type = 'button'
}) => {
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

export default Button;
