import React from 'react';

const Input = ({ label, type = 'text', value, onChange, placeholder, name, id, required = false, ...props }) => {
  return (
    <div className="flex flex-col gap-2 mb-4">
      {label && <label htmlFor={id || name} className="text-sm font-medium text-secondary">{label}</label>}
      <input
        type={type}
        id={id || name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="input-field"
        {...props}
      />
    </div>
  );
};

export default Input;
