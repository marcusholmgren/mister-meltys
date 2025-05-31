import React from 'react';

import './Grid.css';

interface RowProps {
  children: React.ReactNode;
}

export const Row: React.FC<RowProps> = ({ children }) => {
  return (
    <div className="grid-row">
      {children}
    </div>
  );
};

interface ColumnProps {
  children: React.ReactNode;
  size?: string;
}

export const Column: React.FC<ColumnProps> = ({ children, size = '1' }) => {
  return (
    <div className="grid-col" style={{ flex: size }}>
      {children}
    </div>
  );
};
