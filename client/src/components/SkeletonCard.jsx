import React from 'react';

export default function SkeletonCard() {
  return (
    <div className="h-[420px] rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 flex flex-col justify-between animate-pulse">
      <div>
        <div className="flex items-start justify-between mb-5">
          <div className="w-16 h-16 rounded-xl bg-zinc-200 dark:bg-zinc-800" />
          <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800" />
        </div>

        <div className="space-y-2 mb-4">
          <div className="h-4 bg-zinc-200 dark:bg-zinc-800 rounded-md w-3/4" />
          <div className="h-3 bg-zinc-100 dark:bg-zinc-800/60 rounded-md w-1/2" />
          <div className="h-2.5 bg-zinc-100 dark:bg-zinc-800/40 rounded-md w-1/3" />
        </div>

        <div className="space-y-1.5 mb-4">
          <div className="h-3 bg-zinc-100 dark:bg-zinc-800/50 rounded-md w-full" />
          <div className="h-3 bg-zinc-100 dark:bg-zinc-800/50 rounded-md w-5/6" />
        </div>

        <div className="flex gap-1.5">
          <div className="h-5 bg-zinc-100 dark:bg-zinc-800 rounded-full w-16" />
          <div className="h-5 bg-zinc-100 dark:bg-zinc-800 rounded-full w-20" />
        </div>
      </div>

      <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded w-16" />
        <div className="h-7 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-24" />
      </div>
    </div>
  );
}
