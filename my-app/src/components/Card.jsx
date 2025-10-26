import React from 'react';

const Card = ({ 
  children, 
  className = '',
  padding = 'medium',
  shadow = 'medium',
  ...props 
}) => {
  const paddingClasses = {
    none: '',
    small: 'p-4',
    medium: 'p-6',
    large: 'p-8'
  };

  const shadowClasses = {
    none: '',
    small: 'shadow',
    medium: 'shadow-md',
    large: 'shadow-lg'
  };

  const classes = `
    bg-white dark:bg-gray-800 rounded-lg
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${className}
  `.trim();

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;