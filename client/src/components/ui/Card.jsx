import React from 'react';

export default function Card({ children, className = '', hover = true, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 text-zinc-900 dark:text-zinc-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)] ${
        hover ? 'transition-all duration-200 hover:border-zinc-300 dark:hover:border-zinc-700 card-hover' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
}
