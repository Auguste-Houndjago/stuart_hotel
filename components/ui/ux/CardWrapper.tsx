import React from 'react';
import './CardWrapper.css'; 

interface CardWrapperProps {
  children: React.ReactNode;
}

const CardWrapper: React.FC<CardWrapperProps> = ({ children }) => {
  return (
    <div className="card">
      {children}
    </div>
  );
};

export default CardWrapper;
