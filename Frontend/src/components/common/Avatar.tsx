import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

export const Avatar = ({ imageURL, h = 10, w = 10, alt = '' }) => {
  return (
    <figure className={`h-${h} w-${w} mr-2`}>
      {imageURL ? (
        <img
          src={imageURL}
          alt={alt}
          className={`h-full w-full rounded-full object-cover`}
          style={{
            height: `${h === 10 ? '2.5rem' : null}`,
          }}
        />
      ) : (
        <UserCircleIcon
          className={`h-${h} w-${w}  text-gray-500`}
          style={{
            height: `${h === 10 ? '2.5rem' : null}`,
          }}
        />
      )}
    </figure>
  );
};
