import React from 'react';

import './ButtonGroup.css';

interface ButtonGroupProps {
  children: React.ReactNode;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children }) => {
  return (
    <div className="button-group">
      {children}
    </div>
  );
};

export default ButtonGroup;

