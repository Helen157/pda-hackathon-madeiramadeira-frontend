import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  fullWidth?: boolean; 
  disabled?: boolean;
}

const Button = ({ label, onClick }: ButtonProps) => {
  
  const baseStyle: React.CSSProperties = {
  backgroundColor: '#0F263A',
  color: 'rgba(255, 255, 255, 1)',
  padding: '20px 150px', 
  borderRadius: '5px',
  border: 'none',
  cursor: 'pointer',
  fontSize: '30px',  
  fontWeight: '600',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.3s',
  textAlign: 'center',
  minWidth: '160px',   
};


  return (
    <button 
      style={baseStyle}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;