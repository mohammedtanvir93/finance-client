import React, { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface LabelProps {
  required?: boolean;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

const Label: FC<LabelProps> = ({ required = true, htmlFor, children, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        // Default classes that apply by default
        "mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400",

        // User-defined className that can override the default margin
        className
      )}
    >
      {children} {required && <span className="text-red-500">*</span>}
    </label>
  );
};

export default Label;
