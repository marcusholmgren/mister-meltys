import React from 'react';

import './Panel.css';

interface PanelProps {
  title: React.ReactNode;
  children: React.ReactNode;
  horizontalScroll?: boolean; // To acknowledge the prop being passed
}

const Panel: React.FC<PanelProps> = ({ title, children, horizontalScroll: _horizontalScroll }) => {
  // If horizontalScroll should change behavior/style, add logic here.
  // For now, it's just typed to satisfy the caller.
  // Example: const panelClasses = classNames("panel__content", { "panel__content--scroll": _horizontalScroll });
  // <div className={panelClasses}>{children}</div>
  return (
    <div className="panel">
      <div className="panel__title">{title}</div>
      <div className="panel__content">{children}</div>
    </div>
  );
};

export default Panel;
