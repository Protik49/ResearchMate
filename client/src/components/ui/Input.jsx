import React, { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { label, error, helperText, id, className = '', type = 'text', ...props },
  ref
) {
  const inputId = id || props.name || Math.random().toString(36).substring(7);

  return (
    <div className="w-full space-y-1.5 text-left">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-xs font-medium text-zinc-700 dark:text-zinc-300"
        >
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        type={type}
        className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 focus:outline-none focus:ring-2 transition-all duration-150 ${
          error
            ? 'border-rose-400 focus:ring-rose-500/20 focus:border-rose-500'
            : 'border-zinc-200 dark:border-zinc-800 focus:ring-zinc-400/20 focus:border-zinc-900 dark:focus:border-zinc-100'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{helperText}</p>
      )}
    </div>
  );
});

export default Input;
