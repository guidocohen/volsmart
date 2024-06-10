import React from 'react';

export const InfiniteLoader = () => {
  return (
    <div className="w-full">
      <div className="h-1 w-full bg-blue-50 dark:bg-gray-900 overflow-hidden">
        <div className="progress w-full h-full bg-blue-300 left-right" />
      </div>
    </div>
  );
};
