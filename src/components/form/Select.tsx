import React, { useState } from "react";

export interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  className?: string;
  error?: boolean;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  value?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  placeholder = "Select an option",
  onChange,
  className = "",
  value = "",
  error = false
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    onChange(selected); // Pass the selected value up
  };

  return (
    <select
      className={`h-11 w-full appearance-none rounded-lg border px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden dark:focus:border-brand-800 ${value
        ? "text-gray-800 dark:text-white/90"
        : "text-gray-400 dark:text-gray-400"
        } ${className} ${error ? 'text-error-800 border-error-500 dark:text-error-400 dark:border-error-500' : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30'}`}
      value={value}
      onChange={handleChange}
    >
      {/* Placeholder option */}
      <option
        disabled
        value=""
        className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
      >
        {placeholder}
      </option>
      {/* Map over options */}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
