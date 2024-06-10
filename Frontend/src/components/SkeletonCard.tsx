import React from 'react';

export const SkeletonCard = () => (
  <div className="animate-pulse w-full max-w-3xl p-4 border rounded-lg shadow-sm bg-gray-200 dark:bg-gray-700">
    <div className="h-6 bg-gray-300 rounded dark:bg-gray-600 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded dark:bg-gray-600 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded dark:bg-gray-600 mb-2"></div>
  </div>
);
