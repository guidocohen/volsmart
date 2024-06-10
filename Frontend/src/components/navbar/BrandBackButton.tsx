import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const rootPaths = ['auth'];

export const BrandBackButton = ({ setSearchByNameValue }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRoot = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (
      rootPaths.some((s) => location.pathname.includes(s) || location.pathname === '/')
    ) {
      event.preventDefault();
      navigate('/');
    } else {
      dispatch(setSearchByNameValue(''));
      navigate(-1);
    }
  };

  return (
    <Link
      to="#"
      onClick={(event) => {
        handleRoot(event);
      }}
      className="hidden lg:block font-semibold text-2xl lg:w-2/12 w-3/12 lg:mr-3"
    >
      {location.pathname === '/' ? (
        <div>Volsmart</div>
      ) : location.pathname.includes('/auth/') ? (
        <></>
      ) : (
        <div className="flex items-center">
          <div>
            <ArrowLeftIcon className="h-6 w-6 mr-6 text-black dark:text-white" />
          </div>
          Volver
        </div>
      )}
    </Link>
  );
};
