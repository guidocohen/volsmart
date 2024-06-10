import React from "react";

export const DetailField = ({ title, data }) => {
  return (
    <p className="text-sm text-gray-700 dark:text-gray-300">
      <strong>{title}:</strong> {data}
    </p>
  );
};
