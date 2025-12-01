import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`w-24 text-white py-2 rounded cursor-pointer transition ${
        props.className || ''
      }`}
    >
      {children}
    </button>
  );
}
